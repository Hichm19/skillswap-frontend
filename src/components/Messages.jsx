import { useState, useEffect, useRef } from 'react'
import { GetMessages, SendMessage, DeleteMessage } from '../api/message.api.js'
import { GetAllFriend } from '../api/suggestion.api.js'
import { getUser } from '../api/auth.api.js'
import echo from '../echo'

function Messages() {
    const [matches, setMatches] = useState([])
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const messagesEndRef = useRef(null)
    const currentUser = getUser()

    useEffect(() => {
        const loadMatches = async () => {
            const response = await GetAllFriend()
            const matchesWithLastMessage = await Promise.all(
                (response.data.data ?? []).map(async (match) => {
                    try {
                        const messagesResponse = await GetMessages(match.id)
                        const lastMessage = messagesResponse.data.data?.slice(-1)[0]
                        return {
                            ...match,
                            lastMessage: lastMessage || null,
                            unreadCount: messagesResponse.data.data?.filter(
                                m => m.sender_id !== currentUser?.id && !m.read_at
                            ).length || 0
                        }
                    } catch (error) {
                        return {
                            ...match,
                            lastMessage: null,
                            unreadCount: 0
                        }
                    }
                })
            )
            
            const sortedMatches = matchesWithLastMessage.sort((a, b) => {
                const dateA = a.lastMessage?.created_at || a.created_at
                const dateB = b.lastMessage?.created_at || b.created_at
                return new Date(dateB) - new Date(dateA)
            })
            
            setMatches(sortedMatches)
            setLoading(false)
        }
        loadMatches()

        const channel = echo.channel(`user.${currentUser.id}`)
        channel.listen('.new-message', handleNewMessage)

        return () => {
            echo.leaveChannel(`user.${currentUser.id}`)
        }
    }, [])

    const handleNewMessage = (data) => {
        setMatches(prevMatches => {
            const updatedMatches = prevMatches.map(match => {
                if (match.matched_user?.id === data.message.sender_id) {
                    return {
                        ...match,
                        lastMessage: data.message,
                        unreadCount: match.id === selectedMatch?.id 
                            ? match.unreadCount 
                            : match.unreadCount + 1
                    }
                }
                return match
            })
            
            return updatedMatches.sort((a, b) => {
                const dateA = a.lastMessage?.created_at || a.created_at
                const dateB = b.lastMessage?.created_at || b.created_at
                return new Date(dateB) - new Date(dateA)
            })
        })
    }

    useEffect(() => {
        if (!selectedMatch) return
        loadMessages()
        
        setMatches(prev => prev.map(m => 
            m.id === selectedMatch.id ? { ...m, unreadCount: 0 } : m
        ))
        
        if (window.innerWidth < 768) {
            setShowSidebar(false)
        }
        
        const interval = setInterval(loadMessages, 5000)
        return () => clearInterval(interval)
    }, [selectedMatch])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowSidebar(true)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const loadMessages = async () => {
        try {
            const response = await GetMessages(selectedMatch.id)
            setMessages(response.data.data ?? [])
        } catch (error) {
            console.error('Erreur chargement messages:', error)
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || sending) return
        setSending(true)
        try {
            const response = await SendMessage(selectedMatch.id, newMessage)
            const newMsg = response.data.data
            setMessages(prev => [...prev, newMsg])
            
            setMatches(prev => {
                const updated = prev.map(m => 
                    m.id === selectedMatch.id 
                        ? { ...m, lastMessage: newMsg }
                        : m
                )
                return updated.sort((a, b) => {
                    const dateA = a.lastMessage?.created_at || a.created_at
                    const dateB = b.lastMessage?.created_at || b.created_at
                    return new Date(dateB) - new Date(dateA)
                })
            })
            
            setNewMessage('')
        } catch (error) {
            console.error('Erreur envoi:', error)
        } finally {
            setSending(false)
        }
    }

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm('Supprimer ce message ?')) return
        await DeleteMessage(messageId)
        setMessages(prev => prev.filter(m => m.id !== messageId))
    }

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const getInitials = (name) => {
        return name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) ?? '?'
    }

    const formatLastMessage = (match) => {
        if (!match.lastMessage) return 'Aucun message'
        
        const isOwn = match.lastMessage.sender_id === currentUser?.id
        let message = match.lastMessage.content
        
        const maxLength = window.innerWidth < 640 ? 15 : 25
        if (message.length > maxLength) {
            message = message.substring(0, maxLength) + '...'
        }
        
        return isOwn ? `Vous: ${message}` : message
    }

    const handleBackToList = () => {
        setShowSidebar(true)
        setSelectedMatch(null)
    }

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-[#060d1f]">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400 text-sm">Chargement des conversations...</p>
            </div>
        </div>
    )

    return (
        <div className="flex h-screen bg-[#060d1f] relative">
            {showSidebar && selectedMatch && window.innerWidth < 768 && (
                <div 
                    className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            <div className={`
                fixed md:relative z-20 md:z-0
                w-[280px] sm:w-72 
                bg-[#060d1f] border-r border-white/8 
                flex flex-col
                transition-transform duration-300 ease-in-out
                h-full
                ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-4 sm:p-5 border-b border-white/8 flex items-center justify-between">
                    <h2 className="text-slate-100 font-semibold text-sm">Messages</h2>
                    {!selectedMatch && window.innerWidth < 768 && (
                        <span className="text-xs text-slate-600">
                            {matches.length} conversation{matches.length > 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto">
                    {matches.length === 0 && (
                        <div className="text-center mt-8 px-4">
                            <p className="text-slate-600 text-xs">Aucun ami pour l'instant</p>
                            <p className="text-slate-700 text-xs mt-2">
                                Ajoute des amis pour commencer à discuter
                            </p>
                        </div>
                    )}
                    
                    {matches.map(match => (
                        <button
                            key={match.id}
                            onClick={() => setSelectedMatch(match)}
                            className={`
                                w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4 
                                transition-colors text-left relative
                                hover:bg-white/5
                                ${selectedMatch?.id === match.id && !showSidebar
                                    ? 'bg-white/8 border-l-2 border-blue-500' 
                                    : 'border-l-2 border-transparent'
                                }
                                ${match.unreadCount > 0 ? 'bg-white/2' : ''}
                            `}
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1e3a6e] flex items-center justify-center overflow-hidden">
                                    {match.matched_user?.profile_picture ? (
                                        <img
                                            src={`http://127.0.0.1:8000${match.matched_user.profile_picture}`}
                                            className="w-full h-full object-cover"
                                            alt={match.matched_user?.name}
                                        />
                                    ) : (
                                        <span className="text-[10px] sm:text-xs text-slate-300 font-medium">
                                            {getInitials(match.matched_user?.name)}
                                        </span>
                                    )}
                                </div>
                                {match.unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 rounded-full text-[10px] px-1 flex items-center justify-center text-white">
                                        {match.unreadCount > 9 ? '9+' : match.unreadCount}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                    <span className={`
                                        text-xs sm:text-sm font-medium truncate
                                        ${match.unreadCount > 0 ? 'text-slate-100' : 'text-slate-300'}
                                    `}>
                                        {match.matched_user?.name}
                                    </span>
                                    {match.lastMessage && (
                                        <span className="text-[10px] text-slate-600 flex-shrink-0">
                                            {formatTime(match.lastMessage.created_at)}
                                        </span>
                                    )}
                                </div>
                                
                                <span className={`
                                    text-[10px] sm:text-xs truncate max-w-[180px] sm:max-w-[200px]
                                    ${match.unreadCount > 0 
                                        ? 'text-slate-200 font-semibold' 
                                        : 'text-slate-600'
                                    }
                                `}>
                                    {formatLastMessage(match)}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedMatch ? (
                <div className="flex-1 flex flex-col w-full md:w-auto">
                    <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-white/8 flex items-center gap-2 sm:gap-3 bg-[#060d1f]">
                        {window.innerWidth < 768 && (
                            <button
                                onClick={handleBackToList}
                                className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1e3a6e] flex items-center justify-center overflow-hidden flex-shrink-0">
                            {selectedMatch.matched_user?.profile_picture ? (
                                <img
                                    src={`http://127.0.0.1:8000${selectedMatch.matched_user.profile_picture}`}
                                    className="w-full h-full object-cover"
                                    alt={selectedMatch.matched_user?.name}
                                />
                            ) : (
                                <span className="text-[10px] sm:text-xs text-slate-300 font-medium">
                                    {getInitials(selectedMatch.matched_user?.name)}
                                </span>
                            )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <span className="text-slate-100 text-xs sm:text-sm font-medium block truncate">
                                {selectedMatch.matched_user?.name}
                            </span>
                            <span className="text-[10px] text-slate-600">
                                {messages.length} message{messages.length > 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col gap-2 sm:gap-3">
                            {messages.length === 0 && (
                                <div className="text-center mt-8">
                                    <p className="text-slate-600 text-xs sm:text-sm">
                                        Aucun message pour l'instant
                                    </p>
                                    <p className="text-slate-700 text-[10px] sm:text-xs mt-1">
                                        Envoyez le premier message à {selectedMatch.matched_user?.name}
                                    </p>
                                </div>
                            )}
                            
                            {messages.map(message => {
                                const isOwn = message.sender_id === currentUser?.id
                                return (
                                    <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`group max-w-[85%] sm:max-w-[65%] flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
                                            <div className={`
                                                px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm break-words
                                                ${isOwn
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-white/8 text-slate-200 rounded-bl-none border border-white/8'
                                                }
                                            `}>
                                                {message.content}
                                            </div>
                                            <div className="flex items-center gap-2 px-1">
                                                <span className="text-[10px] text-slate-600">
                                                    {formatTime(message.created_at)}
                                                </span>
                                                {isOwn && (
                                                    <button
                                                        onClick={() => handleDeleteMessage(message.id)}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-400"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-white/8 bg-[#060d1f]">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Écrire un message..."
                                disabled={sending}
                                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim() || sending}
                                className="p-2 sm:p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-1 items-center justify-center">
                    <div className="text-center px-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">Sélectionne une conversation</p>
                        <p className="text-slate-600 text-xs">
                            Choisis un ami dans la liste pour commencer à discuter
                        </p>
                    </div>
                </div>
            )}

            {!showSidebar && selectedMatch && window.innerWidth < 768 && (
                <button
                    onClick={() => setShowSidebar(true)}
                    className="fixed bottom-4 left-4 z-30 p-3 bg-[#1e3a6e] rounded-full shadow-lg hover:bg-[#2a4a8a] transition-colors"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}
        </div>
    )
}

export default Messages