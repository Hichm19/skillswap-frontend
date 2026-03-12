import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SeeSentFriendRequest, DeleteFriendRequest } from '../../api/suggestion.api.js'

function SentRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const response = await SeeSentFriendRequest()
      const validRequests = (response.data.data || []).filter(req => req.receiver != null)
      setRequests(validRequests)
    } catch (error) {
      console.error('Erreur lors du chargement des demandes envoyées:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelRequest = async (requestId, receiverName) => {
    if (window.confirm(`Voulez-vous vraiment annuler la demande envoyée à ${receiverName} ?`)) {
      try {
        await DeleteFriendRequest(requestId)
        setRequests(requests.filter(req => req.id !== requestId))
      } catch (error) {
        console.error('Erreur lors de l\'annulation:', error)
        alert('Erreur lors de l\'annulation de la demande')
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
    if (!dateString) return 'Date inconnue'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return "Aujourd'hui"
    } else if (diffDays === 1) {
      return "Hier"
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des demandes envoyées...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Demandes envoyées
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {requests.length === 0 
              ? 'Aucune demande envoyée'
              : `Vous avez envoyé ${requests.length} demande${requests.length > 1 ? 's' : ''}`
            }
          </p>
        </div>

        {requests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {requests.map((request) => {
              if (!request.receiver) return null

              const receiver = request.receiver
              const skills = receiver.skills || []

              return (
                <div 
                  key={request.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 hover:shadow-md transition-all relative group"
                >
                  <div 
                    className="flex items-center gap-3 mb-4 cursor-pointer"
                    onClick={() => handleProfileClick(receiver.id)}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:shadow-md transition-all overflow-hidden">
                        {receiver.profile_picture ? (
                          <img 
                            src={receiver.profile_picture} 
                            alt={receiver.name || 'Utilisateur'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitials(receiver.name)
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors truncate">
                        {receiver.name || 'Utilisateur inconnu'}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(request.created_at)}
                      </p>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {skills.filter(s => s.pivot?.type === "teach").length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Maîtrise
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {skills
                              .filter(s => s.pivot?.type === "teach")
                              .slice(0, 3)
                              .map(skill => (
                                <span 
                                  key={skill.id} 
                                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                                >
                                  {skill.name}
                                </span>
                              ))}
                            {skills.filter(s => s.pivot?.type === "teach").length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{skills.filter(s => s.pivot?.type === "teach").length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {skills.filter(s => s.pivot?.type === "learn").length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Apprend
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {skills
                              .filter(s => s.pivot?.type === "learn")
                              .slice(0, 3)
                              .map(skill => (
                                <span 
                                  key={skill.id} 
                                  className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md"
                                >
                                  {skill.name}
                                </span>
                              ))}
                            {skills.filter(s => s.pivot?.type === "learn").length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{skills.filter(s => s.pivot?.type === "learn").length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => handleCancelRequest(request.id, receiver.name || 'cet utilisateur')}
                      className="w-full px-3 py-2.5 sm:py-2 border border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 group/btn"
                    >
                      <svg
                        className="w-4 h-4 transition-transform group-hover/btn:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="hidden xs:inline">Annuler la demande</span>
                      <span className="xs:hidden">Annuler</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleProfileClick(receiver.id)}
                    className="mt-2 w-full sm:hidden text-xs text-orange-600 dark:text-orange-400 hover:underline text-center"
                  >
                    Voir le profil complet
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="max-w-sm mx-auto px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Aucune demande envoyée
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Vous n'avez pas encore envoyé de demandes d'amis. 
                Explorez les suggestions pour trouver des personnes avec qui échanger !
              </p>
              <button
                onClick={() => navigate('/dashboard/suggestions')}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Voir les suggestions
              </button>
            </div>
          </div>
        )}

        {requests.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              {requests.length} demande{requests.length > 1 ? 's' : ''} en attente
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SentRequests