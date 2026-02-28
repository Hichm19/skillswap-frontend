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
      console.log('Amis chargés:', response.data)
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
        alert('Ami supprimé avec succès')
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression')
      }
    }
  }

  const handleProfileClick = (friendId) => {
    navigate(`/profil/${friendId}`)
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

  // Filtrer les amis par recherche
  const filteredFriends = friends.filter(friend => 
    friend.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement de vos amis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mes amis
        </h1>
        <p className="text-gray-600">
          Vous avez {friends.length} ami{friends.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un ami..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Liste des amis */}
      {filteredFriends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Photo de profil */}
              <div 
                className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 cursor-pointer"
                onClick={() => handleProfileClick(friend.id)}
              >
                {friend.profile_picture ? (
                  <img
                    src={friend.profile_picture}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">
                      {getInitials(friend.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Informations */}
              <div className="p-5">
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-4 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleProfileClick(friend.id)}
                >
                  {friend.name}
                </h3>

                {/* Actions */}
                <button
                  onClick={() => handleDeleteFriend(friend.id, friend.name)}
                  className="w-full px-3 py-2 border border-red-300 hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchTerm ? 'Aucun ami trouvé' : 'Vous n\'avez pas encore d\'amis'}
          </h3>
          <p className="mt-2 text-gray-500">
            {searchTerm 
              ? 'Essayez avec un autre terme de recherche'
              : 'Revenez plus tard pour voir vos amis'}
          </p>
        </div>
      )}
    </div>
  )
}

export default FriendsList