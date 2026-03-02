import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetMessages, SendMessage, DeleteMessage } from '../api/message.api.js'
import { getUser } from '../api/auth.api.js'

function Messages() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [matchInfo, setMatchInfo] = useState(null)
  const messagesEndRef = useRef(null)
  const currentUser = getUser()

  // Charger les messages
  useEffect(() => {
    loadMessages()
    // Polling toutes les 5 secondes pour les nouveaux messages
    const interval = setInterval(loadMessages, 5000)
    return () => clearInterval(interval)
  }, [matchId])

  // Scroll automatique vers le bas
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    try {
      const response = await GetMessages(matchId)
      setMessages(response.data.data || [])
      
      // Récupérer les infos du match (à adapter selon votre API)
      if (response.data.data.length > 0) {
        const firstMessage = response.data.data[0]
        const otherUser = firstMessage.user_id === currentUser?.id 
          ? firstMessage.user 
          : { id: firstMessage.user_id, name: 'Utilisateur' }
        setMatchInfo(otherUser)
      }
    } catch (error) {
      console.error('Erreur chargement messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      const response = await SendMessage(matchId, newMessage)
      setMessages([...messages, response.data.data])
      setNewMessage('')
    } catch (error) {
      console.error('Erreur envoi message:', error)
      alert('Erreur lors de l\'envoi du message')
    } finally {
      setSending(false)
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Supprimer ce message ?')) return

    try {
      await DeleteMessage(messageId)
      setMessages(messages.filter(m => m.id !== messageId))
    } catch (error) {
      console.error('Erreur suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier"
    } else {
      return date.toLocaleDateString()
    }
  }

  // Grouper les messages par date
  const groupMessagesByDate = () => {
    const groups = []
    let currentDate = null
    
    messages.forEach(message => {
      const messageDate = formatDate(message.created_at)
      if (messageDate !== currentDate) {
        currentDate = messageDate
        groups.push({
          date: messageDate,
          messages: [message]
        })
      } else {
        groups[groups.length - 1].messages.push(message)
      }
    })
    
    return groups
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Chargement de la conversation...</p>
      </div>
    )
  }

  const messageGroups = groupMessagesByDate()

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {matchInfo?.name?.charAt(0) || '?'}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{matchInfo?.name || 'Conversation'}</h2>
            <p className="text-xs text-gray-500">En ligne</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Séparateur de date */}
            <div className="flex justify-center my-4">
              <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                {group.date}
              </span>
            </div>

            {/* Messages du groupe */}
            <div className="space-y-3">
              {group.messages.map((message) => {
                const isOwn = message.user_id === currentUser?.id
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                      {/* Nom de l'expéditeur (pour les messages des autres) */}
                      {!isOwn && (
                        <p className="text-xs text-gray-500 mb-1 ml-2">
                          {message.user?.name}
                        </p>
                      )}
                      
                      <div
                        className={`
                          relative group rounded-2xl px-4 py-2
                          ${isOwn 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white border border-gray-200 rounded-bl-none'
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        
                        {/* Heure et actions */}
                        <div className={`
                          flex items-center gap-2 mt-1 text-xs
                          ${isOwn ? 'text-blue-100' : 'text-gray-400'}
                        `}>
                          <span>{formatTime(message.created_at)}</span>
                          
                          {/* Bouton supprimer (seulement pour ses propres messages) */}
                          {isOwn && (
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Avatar (pour les messages des autres) */}
                    {!isOwn && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium order-1 mr-2">
                        {message.user?.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className={`
              p-2 rounded-full transition-colors
              ${newMessage.trim() && !sending
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Messages