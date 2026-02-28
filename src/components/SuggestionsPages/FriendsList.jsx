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
    if (userId) navigate(`/profil/${userId}`)
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  }

  const filteredFriends = friends.filter(friend =>
    friend.matched_user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <div style={{ width: 28, height: 28, border: '3px solid #e4e6eb', borderTopColor: '#1877f2', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#050505', margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          Amis
        </h1>
        <span style={{ color: '#65676b', fontSize: 14, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          {friends.length} ami{friends.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Barre de recherche */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#65676b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher un ami..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 340,
            padding: '8px 12px 8px 34px',
            border: 'none',
            borderRadius: 20,
            backgroundColor: '#f0f2f5',
            fontSize: 15,
            color: '#050505',
            outline: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Grille d'amis */}
      {filteredFriends.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 10,
        }}>
          {filteredFriends.map((friend) => {
            const user = friend.matched_user
            if (!user) return null

            return (
              <div
                key={friend.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
              >
                {/* Photo */}
                <div
                  onClick={() => handleProfileClick(user.id)}
                  style={{ cursor: 'pointer', width: '100%', paddingTop: '100%', position: 'relative', backgroundColor: '#d8dadf' }}
                >
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      backgroundColor: '#bcc0c4', fontSize: 36, fontWeight: 700, color: '#fff'
                    }}>
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>

                {/* Infos + bouton */}
                <div style={{ padding: '8px 10px 10px' }}>
                  <p
                    onClick={() => handleProfileClick(user.id)}
                    style={{
                      margin: '0 0 8px 0',
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#050505',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.name}
                  </p>

                  <button
                    onClick={() => handleDeleteFriend(friend.id, user.name)}
                    style={{
                      width: '100%',
                      padding: '6px 0',
                      backgroundColor: '#e4e6eb',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#050505',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d8dadf'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e4e6eb'}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 0',
          color: '#65676b',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}>
          <p style={{ fontSize: 17, fontWeight: 600, color: '#050505', margin: '0 0 4px' }}>
            {searchTerm ? 'Aucun résultat' : 'Aucun ami pour l\'instant'}
          </p>
          <p style={{ fontSize: 14, margin: 0 }}>
            {searchTerm ? 'Essayez avec un autre nom.' : 'Vos amis apparaîtront ici.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default FriendsList