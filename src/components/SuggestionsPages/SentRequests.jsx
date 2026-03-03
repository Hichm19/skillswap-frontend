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
      // Filtrer les demandes qui ont un receiver valide
      const validRequests = (response.data.data || []).filter(req => req.receiver != null)
      setRequests(validRequests)
      console.log('Demandes envoyées:', response.data)
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
        alert('Demande annulée avec succès')
      } catch (error) {
        console.error('Erreur lors de l\'annulation:', error)
        alert('Erreur lors de l\'annulation de la demande')
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

  // Fonction pour formater la date
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
      return date.toLocaleDateString()
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement des demandes envoyées...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Demandes envoyées
        </h1>
        <p className="text-gray-600">
          Vous avez envoyé {requests.length} demande{requests.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Liste des demandes envoyées */}
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => {
            // Vérification que receiver existe
            if (!request.receiver) {
              return null
            }

            const receiver = request.receiver
            const skills = receiver.skills || []
            
            return (
              <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                {/* En-tête avec avatar et nom - cliquable */}
                <div 
                  className="flex items-center gap-3 mb-4 cursor-pointer group"
                  onClick={() => handleProfileClick(receiver.id)}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:from-orange-600 group-hover:to-orange-700 transition-all">
                    {receiver.profile_picture ? (
                      <img 
                        src={receiver.profile_picture} 
                        alt={receiver.name || 'Utilisateur'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(receiver.name)
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {receiver.name || 'Utilisateur inconnu'}
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

                {/* Statut et date */}
                <div className="mb-4">
                
                  <p className="text-xs text-gray-400 mt-2">
                    Envoyée {formatDate(request.created_at)}
                  </p>
                </div>

                {/* Action */}
                <div className="pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleCancelRequest(request.id, receiver.name || 'cet utilisateur')}
                    className="w-full px-3 py-2 border border-orange-300 hover:bg-orange-50 text-orange-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
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
                    Annuler la demande
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Aucune demande envoyée
          </h3>
          <p className="mt-2 text-gray-500">
            Vous n'avez pas encore envoyé de demandes d'amis
          </p>
          <button
            onClick={() => navigate('/suggestions')}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Voir les suggestions
          </button>
        </div>
      )}
    </div>
  )
}

export default SentRequests