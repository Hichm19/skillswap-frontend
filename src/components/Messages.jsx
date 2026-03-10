import React, { useState, useEffect, useRef } from 'react'
import { GetMessages, SendMessage, DeleteMessage } from '../api/message.api.js'
import { GetAllFriend } from '../api/suggestion.api.js'
import { getUser } from '../api/auth.api.js'

function Messages() {
    const [matches, setMatches] = useState([])
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const messagesEndRef = useRef(null)
    const currentUser = getUser()

    // Charger la liste des amis/matches
    useEffect(() => {
        const loadMatches = async () => {
            const response = await GetAllFriend()
            setMatches(response.data.data ?? [])
            setLoading(false)
            
        }
        loadMatches()
    }, [])

    // Charger les messages du match sélectionné
    useEffect(() => {
        if (!selectedMatch) return
        loadMessages()
        const interval = setInterval(loadMessages, 5000)
        return () => clearInterval(interval)
    }, [selectedMatch])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

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
            setMessages(prev => [...prev, response.data.data])
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

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-slate-400">Chargement...</p>
        </div>
    )

    return (
        <div className="flex h-screen bg-[#060d1f]">

            {/* ── SIDEBAR ── */}
            <div className="w-72 border-r border-white/8 flex flex-col">
                <div className="p-5 border-b border-white/8">
                    <h2 className="text-slate-100 font-semibold text-sm">Messages</h2>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {matches.length === 0 && (
                        <p className="text-slate-600 text-xs text-center mt-8">Aucun ami pour l'instant</p>
                    )}
                    {matches.map(match => (
                        <button
                            key={match.id}
                            onClick={() => setSelectedMatch(match)}
                            className={`w-full flex items-center gap-3 px-5 py-4 transition-colors text-left
                                ${selectedMatch?.id === match.id
                                    ? 'bg-white/8 border-l-2 border-blue-500'
                                    : 'hover:bg-white/5 border-l-2 border-transparent'
                                }`}
                        >
                            {/* Avatar */}
                            <div className="w-9 h-9 rounded-full bg-[#1e3a6e] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {match.matched_user?.profile_picture ? (
                                    <img
                                        src={`http://127.0.0.1:8000${match.matched_user.profile_picture}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-slate-300 font-medium">
                                        {getInitials(match.matched_user?.name)}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col min-w-0">
                                <span className="text-slate-200 text-sm font-medium truncate">
                                    {match.matched_user?.name}
                                </span>
                                <span className="text-slate-600 text-xs truncate">
                                    Cliquer pour discuter
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── CONVERSATION ── */}
            {selectedMatch ? (
                <div className="flex-1 flex flex-col">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1e3a6e] flex items-center justify-center overflow-hidden">
                            {selectedMatch.matched_user?.profile_picture ? (
                                <img
                                    src={`http://127.0.0.1:8000${selectedMatch.matched_user.profile_picture}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-xs text-slate-300 font-medium">
                                    {getInitials(selectedMatch.matched_user?.name)}
                                </span>
                            )}
                        </div>
                        <span className="text-slate-100 text-sm font-medium">
                            {selectedMatch.matched_user?.name}
                        </span>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                        {messages.map(message => {
                            const isOwn = message.sender_id === currentUser?.id
                            return (
                                <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`group max-w-[65%] flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-2 rounded-2xl text-sm
                                            ${isOwn
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white/8 text-slate-200 rounded-bl-none border border-white/8'
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-600">
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

                    {/* Input */}
                    <div className="px-6 py-4 border-t border-white/8">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Écrire un message..."
                                disabled={sending}
                                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim() || sending}
                                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-slate-600 text-sm">Sélectionne une conversation</p>
                </div>
            )}
        </div>
    )
}

export default Messages