import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getReceiveFriendRequest, RefusedFriendRequest } from '../../api/suggestion.api.js'

function ReceivedRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const response = await getReceiveFriendRequest()
      setRequests(response.data.data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRequest = async (requestId, senderId) => {
    try {
      await RefusedFriendRequest(requestId, { status: 'accepted' })
      setRequests(requests.filter(req => req.id !== requestId))
      alert('Demande d\'ami acceptée !')
    } catch (error) {
      console.error('Erreur lors de l\'acceptation:', error)
      alert('Erreur lors de l\'acceptation')
    }
  }

  const handleRefuseRequest = async (requestId) => {
    if (window.confirm('Voulez-vous vraiment refuser cette demande ?')) {
      try {
        await RefusedFriendRequest(requestId, { status: 'refused' })
        setRequests(requests.filter(req => req.id !== requestId))
        alert('Demande refusée')
      } catch (error) {
        console.error('Erreur lors du refus:', error)
        alert('Erreur lors du refus')
      }
    }
  }

  const handleProfileClick = (userId) => {
    navigate(`/dashboard/profil/${userId}`)
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des demandes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Demandes d'amis reçues
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {requests.length === 0 
              ? 'Aucune demande en attente'
              : `Vous avez ${requests.length} demande${requests.length > 1 ? 's' : ''} en attente`
            }
          </p>
        </div>

        {requests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {requests.map((request) => {
              const sender = request.sender
              const skills = sender?.skills || []

              return (
                <div 
                  key={request.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
                >
                  <div 
                    className="flex items-center gap-3 mb-4 cursor-pointer group"
                    onClick={() => handleProfileClick(sender.id)}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:from-blue-600 group-hover:to-blue-700 transition-all overflow-hidden">
                      {sender.profile_picture ? (
                        <img 
                          src={sender.profile_picture} 
                          alt={sender.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(sender.name)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {sender.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Demande reçue le {formatDate(request.created_at)}
                  </p>

                  {skills.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {skills.filter(s => s.pivot?.type === "teach").length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                            Maîtrise
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            {skills
                              .filter(s => s.pivot?.type === "teach")
                              .slice(0, 3)
                              .map(skill => (
                                <span key={skill.id} className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                  {skill.name}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {skills.filter(s => s.pivot?.type === "learn").length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                            Apprend
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            {skills
                              .filter(s => s.pivot?.type === "learn")
                              .slice(0, 3)
                              .map(skill => (
                                <span key={skill.id} className="text-green-600 dark:text-green-400 text-sm font-medium">
                                  {skill.name}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => handleAcceptRequest(request.id, sender.id)}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleRefuseRequest(request.id)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Aucune demande en attente
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Vous n'avez pas de demandes d'amis pour le moment
            </p>
            <button
              onClick={() => navigate('/dashboard/suggestions')}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Voir les suggestions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceivedRequests