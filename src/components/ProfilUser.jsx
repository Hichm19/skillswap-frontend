import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetUserById } from '../api/users.api.js'

function ProfilUser() {
    const [profil, setProfil] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const LoadData = async () => {
            const response = await GetUserById(id)
            setProfil(response.data.data)
            console.log(response.data);
        }
        LoadData()
    }, [id])

    const getInitials = (name) => {
    return name
        .split(' ')           
        .map(word => word[0]) 
        .join('')             
        .toUpperCase()        
        .slice(0, 2);         
    }

    if (!profil) return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">Chargement...</p>
      </div>
    )

return (
    <div className="max-w-xl mx-auto p-8">

     
        <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                {profil.profile_picture ? (
                    <img src={profil.profile_picture} alt={profil.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                    <span className="text-xl font-semibold text-white">{getInitials(profil.name)}</span>
                )}
            </div>
            <h1 className="text-xl font-semibold text-gray-900">{profil.name}</h1>
            <p className="mt-1 text-gray-400 text-sm">{profil.bio ?? "Aucune bio"}</p>
        </div>

        <div className="border-t border-gray-100 mb-8" />

        {/* Skills */}
        <div className="space-y-6">

            {profil.skills?.filter(s => s.pivot.type === "teach").length > 0 && (
                <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Maîtrise</p>
                    <div className="flex flex-wrap gap-3">
                        {profil.skills.filter(s => s.pivot.type === "teach").map(skill => (
                            <span key={skill.id} className="text-blue-600 text-sm font-medium">
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
                            <span key={skill.id} className="text-green-600 text-sm font-medium">
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
    </div>
  )
}

export default ProfilUser