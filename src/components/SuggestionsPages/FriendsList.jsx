import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetAllFriend, DeleteFriend } from '../../api/suggestion.api.js'

function FriendsList() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadFriends()
  }, [])

  const loadFriends = async () => {
    try {
      setLoading(true)
      const response = await GetAllFriend()
      setFriends(response.data.data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des amis:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFriend = async (friendId, friendName) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${friendName} de vos amis ?`)) {
      try {
        await DeleteFriend(friendId)
        setFriends(friends.filter(friend => friend.id !== friendId))
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  const handleProfileClick = (userId) => {
    navigate(`/dashboard/profil/${userId}`)
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  }

  const getImageUrl = (path) => {
    if (!path) return null
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `http://127.0.0.1:8000${cleanPath}`
  }

  const filteredFriends = friends.filter(friend =>
    friend.matched_user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Amis
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {friends.length} ami{friends.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="relative flex-1 sm:flex-initial sm:max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un ami..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {filteredFriends.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <div className="col-span-6">Utilisateur</div>
            <div className="col-span-3">Ami depuis</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredFriends.map((friend) => {
              const user = friend.matched_user
              if (!user) return null

              const imageUrl = getImageUrl(user.profile_picture)

              return (
                <div key={friend.id} className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="sm:hidden">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        onClick={() => handleProfileClick(user.id)}
                        className="w-12 h-12 rounded-full cursor-pointer overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0"
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold">${getInitials(user.name)}</div>`
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold">
                            {getInitials(user.name)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p 
                          onClick={() => handleProfileClick(user.id)}
                          className="font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                        >
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Ami depuis {new Date(friend.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => navigate('/dashboard/messages')}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Message</span>
                      </button>
                      <button
                        onClick={() => handleDeleteFriend(friend.id, user.name)}
                        className="flex-1 px-3 py-2 border border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                    <div className="col-span-6 flex items-center gap-3">
                      <div 
                        onClick={() => handleProfileClick(user.id)}
                        className="w-10 h-10 rounded-full cursor-pointer overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0"
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-sm">${getInitials(user.name)}</div>`
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                            {getInitials(user.name)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p 
                          onClick={() => handleProfileClick(user.id)}
                          className="font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                        >
                          {user.name}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(friend.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="col-span-3 flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate('/dashboard/messages')}
                        className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        title="Envoyer un message"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteFriend(friend.id, user.name)}
                        className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        title="Supprimer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 sm:py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="max-w-sm mx-auto px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun résultat trouvé' : 'Aucun ami pour l\'instant'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm 
                ? 'Aucun ami ne correspond à votre recherche.'
                : 'Explorez les suggestions pour trouver des amis !'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/dashboard/suggestions')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Voir les suggestions
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FriendsList