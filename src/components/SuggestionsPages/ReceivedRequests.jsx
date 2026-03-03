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
      console.log('Demandes reçues:', response.data)
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

  // Fonction pour générer les initiales à partir du nom
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement des demandes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Demandes d'amis reçues
        </h1>
        <p className="text-gray-600">
          Vous avez {requests.length} demande{requests.length > 1 ? 's' : ''} en attente
        </p>
      </div>

      {/* Liste des demandes */}
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => {
            const sender = request.sender
            const skills = sender?.skills || []
            
            return (
              <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                {/* En-tête avec avatar et nom - cliquable */}
                <div 
                  className="flex items-center gap-3 mb-4 cursor-pointer group"
                  onClick={() => handleProfileClick(sender.id)}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                    {sender.profile_picture ? (
                      <img 
                        src={sender.profile_picture} 
                        alt={sender.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(sender.name)
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {sender.name}
                  </h3>
                </div>

                {/* Compétences si disponibles */}
                {skills.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {/* Compétences maîtrisées */}
                    {skills.filter(s => s.pivot?.type === "teach").length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Maîtrise
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          {skills
                            .filter(s => s.pivot?.type === "teach")
                            .slice(0, 3)
                            .map(skill => (
                              <span key={skill.id} className="text-blue-600 text-sm font-medium">
                                {skill.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Compétences à apprendre */}
                    {skills.filter(s => s.pivot?.type === "learn").length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Apprend
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          {skills
                            .filter(s => s.pivot?.type === "learn")
                            .slice(0, 3)
                            .map(skill => (
                              <span key={skill.id} className="text-green-600 text-sm font-medium">
                                {skill.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Date de la demande */}
                <p className="text-xs text-gray-400 mb-4">
                  Demande reçue le {new Date(request.created_at).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleAcceptRequest(request.id, sender.id)}
                    className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleRefuseRequest(request.id)}
                    className="flex-1 px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
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
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Aucune demande en attente
          </h3>
          <p className="mt-2 text-gray-500">
            Vous n'avez pas de demandes d'amis pour le moment
          </p>
        </div>
      )}
    </div>
  )
}

export default ReceivedRequests