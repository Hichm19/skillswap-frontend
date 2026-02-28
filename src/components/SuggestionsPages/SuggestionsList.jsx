import React from 'react'
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import {FriendSuggestions, getSendFriendRequest} from "../../api/suggestion.api.js"

function SuggestionsList() {
  const [Suggestions , setSuggestions]= useState([])
  const [VisibleCount, setVisibleCount]= useState(6)
  const navigate = useNavigate()
  
  useEffect( () =>{
   const LoadData = async() => {
    const response = await FriendSuggestions()
    setSuggestions(response.data.data)
    console.log(response.data);
    
   } 
   LoadData()
    
  }, [])

  const handleAddFriend = async (receiverId) => {
    try {
        await getSendFriendRequest({ receiver_id: receiverId })
        alert("Demande envoyée !")
    } catch (err) {
        if (err.response?.status === 409) {
            alert("Demande déjà envoyée")
        }
    }
  }

  const handleProfileClick = (userId) => {
    navigate(`/profil/${userId}`)
  }

  // Fonction pour générer les initiales à partir du nom
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Suggestions d'amis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Suggestions.slice(0, VisibleCount).map(({id, name, skills}) => {
          const skillTeach = skills.filter(skill => skill.pivot.type === "teach")
          const skillLearn = skills.filter(skill => skill.pivot.type === "learn")
          
          return (
            <div key={id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
              {/* En-tête avec avatar initiales et nom - cliquable */}
              <div 
                className="flex items-center gap-3 mb-4 cursor-pointer group"
                onClick={() => handleProfileClick(id)}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                  {getInitials(name)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {name}
                </h3>
              </div>

              {/* Compétences */}
              <div className="space-y-3 mb-4">
                {/* Compétences maîtrisées */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Maîtrise
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {skillTeach.slice(0, 3).map(skill => (
                      <span 
                        key={skill.id} 
                        className="text-blue-600 text-sm font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {skillTeach.length > 3 && (
                      <span className="text-gray-400 text-sm font-medium">
                        +{skillTeach.length - 3}
                      </span>
                    )}
                    {skillTeach.length === 0 && (
                      <span className="text-sm text-gray-400 italic">Aucune</span>
                    )}
                  </div>
                </div>

                {/* Compétences à apprendre */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Apprend
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {skillLearn.slice(0, 3).map(skill => (
                      <span 
                        key={skill.id} 
                        className="text-green-600 text-sm font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {skillLearn.length > 3 && (
                      <span className="text-gray-400 text-sm font-medium">
                        +{skillLearn.length - 3}
                      </span>
                    )}
                    {skillLearn.length === 0 && (
                      <span className="text-sm text-gray-400 italic">Aucune</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleAddFriend(id)}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Ajouter
                </button>
                <button
                  className="flex-1 px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Ignorer
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bouton Voir plus */}
      {Suggestions.length > VisibleCount && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount(VisibleCount + 6)}
            className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Voir plus de suggestions
          </button>
        </div>
      )}

      {/* Message si aucune suggestion */}
      {Suggestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune suggestion pour le moment</p>
        </div>
      )}
    </div>
  )
}

export default SuggestionsList