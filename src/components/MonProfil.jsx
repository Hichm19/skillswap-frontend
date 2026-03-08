import React from 'react'
import { me } from "../api/auth.api"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaCamera } from 'react-icons/fa'
import SkillsModal from './SkillsModal.jsx'

function MonProfil() {
  const [profil, setProfil] = useState(null)
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const navigate = useNavigate()

 
    const LoadProfil = async () => {
        const response = await me()
        setProfil(response.data.user)
    }
  


  useEffect(() => {
      const init = async () => {
          await LoadProfil()
      }
      init()
  }, [])

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleModalClose = (shouldRefresh) => {
      setShowSkillsModal(false)
      if (shouldRefresh) LoadProfil()
  }


  if (!profil) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-8 relative">
      <button
        onClick={() => navigate('/modifier-profil')}
        className="absolute top-8 left-8 p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FaPencilAlt className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            {profil.profile_picture ? (
              <img src={profil.profile_picture} alt={profil.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-xl font-semibold text-white">{getInitials(profil.name)}</span>
            )}
          </div>
          <button
            onClick={() => navigate('/modifier-photo')}
            className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <FaCamera className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">{profil.name}</h1>
        <p className="mt-1 text-gray-400 text-sm">{profil.bio ?? "Aucune bio"}</p>
      </div>

      <div className="border-t border-gray-100 mb-8" />

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-900">Mes compétences</h2>
          <button
            onClick={() => setShowSkillsModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <FaPencilAlt className="w-4 h-4" />
            Modifier
          </button>
        </div>

        {profil.skills?.filter(s => s.pivot.type === "teach").length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Maîtrise</p>
            <div className="flex flex-wrap gap-3">
              {profil.skills.filter(s => s.pivot.type === "teach").map(skill => (
                <span key={skill.id} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {profil.skills?.filter(s => s.pivot.type === "learn").length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Veut apprendre</p>
            <div className="flex flex-wrap gap-3">
              {profil.skills.filter(s => s.pivot.type === "learn").map(skill => (
                <span key={skill.id} className="px-3 py-1.5 bg-green-50 text-green-600 text-sm font-medium rounded-lg">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {(!profil.skills || profil.skills.length === 0) && (
          <p className="text-gray-300 text-sm">Aucune compétence renseignée</p>
        )}
      </div>

      {showSkillsModal && (
          <SkillsModal onClose={handleModalClose} />
      )}
    </div>
  )
}

export default MonProfil