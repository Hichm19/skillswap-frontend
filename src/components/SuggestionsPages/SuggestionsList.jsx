import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FriendSuggestions, getSendFriendRequest, SearchUser } from "../../api/suggestion.api.js"

function SuggestionsList() {
  const [Suggestions, setSuggestions] = useState([])
  const [VisibleCount, setVisibleCount] = useState(6)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    const LoadData = async () => {
      const response = await FriendSuggestions()
      setSuggestions(response.data.data)
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
    navigate(`/dashboard/profil/${userId}`)
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      const response = await SearchUser(searchTerm)
      setSearchResults(response.data.data)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const displayList = searchTerm ? searchResults : Suggestions

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Suggestions d'amis
          </h1>
          
          <div className="relative max-w-md">
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
          
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {displayList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayList.slice(0, VisibleCount).map(({ id, name, skills }) => {
                const skillTeach = skills.filter(skill => skill.pivot.type === "teach")
                const skillLearn = skills.filter(skill => skill.pivot.type === "learn")
                
                return (
                  <div 
                    key={id} 
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all"
                  >
                    <div 
                      className="flex items-center gap-3 mb-4 cursor-pointer group"
                      onClick={() => handleProfileClick(id)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm group-hover:shadow-md transition-all overflow-hidden">
                          {getInitials(name)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {skillTeach.length + skillLearn.length} compétence{(skillTeach.length + skillLearn.length) > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Maîtrise
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skillTeach.slice(0, 3).map(skill => (
                            <span 
                              key={skill.id} 
                              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                            >
                              {skill.name}
                            </span>
                          ))}
                          {skillTeach.length > 3 && (
                            <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                              +{skillTeach.length - 3}
                            </span>
                          )}
                          {skillTeach.length === 0 && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 italic">Aucune</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Apprend
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skillLearn.slice(0, 3).map(skill => (
                            <span 
                              key={skill.id} 
                              className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md"
                            >
                              {skill.name}
                            </span>
                          ))}
                          {skillLearn.length > 3 && (
                            <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                              +{skillLearn.length - 3}
                            </span>
                          )}
                          {skillLearn.length === 0 && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 italic">Aucune</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => handleAddFriend(id)}
                        className="flex-1 px-3 py-2.5 xs:py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Ajouter
                      </button>
                      <button
                        className="flex-1 px-3 py-2.5 xs:py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                      >
                        Ignorer
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {!searchTerm && Suggestions.length > VisibleCount && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Voir plus de suggestions
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="max-w-sm mx-auto px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'Aucun résultat' : 'Aucune suggestion'}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {searchTerm 
                  ? `Aucun utilisateur ne correspond à "${searchTerm}"`
                  : 'Revenez plus tard, de nouvelles suggestions apparaîtront bientôt !'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SuggestionsList