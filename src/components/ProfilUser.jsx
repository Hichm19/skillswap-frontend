import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetUserById } from '../api/users.api.js'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import SkillsBanner from '../assets/Skills.png'

function ProfilUser() {
    const [profil, setProfil] = useState(null)
    const [bannerError, setBannerError] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const LoadData = async () => {
            const response = await GetUserById(id)
            setProfil(response.data.data)
        }
        LoadData()
    }, [id])

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Non renseigné'
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    if (!profil) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement du profil...</p>
                </div>
            </div>
        )
    }

    const teachSkills = profil.skills?.filter(s => s.pivot?.type === "teach") || []
    const learnSkills = profil.skills?.filter(s => s.pivot?.type === "learn") || []

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    
                    <div className="relative h-32 sm:h-48 overflow-hidden bg-gray-200">
                        {!bannerError ? (
                            <img
                                src={SkillsBanner}
                                alt="Skills banner"
                                className="w-full h-full object-cover"
                                onError={() => setBannerError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                <span className="text-white text-2xl sm:text-3xl font-bold">Skills</span>
                            </div>
                        )}
                    </div>

                    <div className="relative px-4 sm:px-8 pb-8">
                        <div className="absolute -top-16 left-4 sm:left-8">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                                {profil.profile_picture ? (
                                    <img 
                                        src={`http://127.0.0.1:8000${profil.profile_picture}`} 
                                        alt={profil.name} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-3xl sm:text-4xl font-bold text-white">
                                            {getInitials(profil.name)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-16 sm:pt-20">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        {profil.name}
                                    </h1>
                                </div>
                                
                                <div className="flex gap-4 text-sm">
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-blue-600">{teachSkills.length}</span>
                                        <span className="text-gray-500">Maîtrise</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-green-600">{learnSkills.length}</span>
                                        <span className="text-gray-500">Apprend</span>
                                    </div>
                                </div>
                            </div>

                            {profil.bio && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                    <p className="text-gray-700">{profil.bio}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mx-4 sm:mx-8" />

                    <div className="p-4 sm:p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">À propos</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            
                            {profil.created_at && (
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                        <FaCalendarAlt className="w-4 h-4" />
                                        Membre depuis
                                    </p>
                                    <p className="text-gray-900 font-medium">{formatDate(profil.created_at)}</p>
                                </div>
                            )}

                            {profil.location && (
                                <div className="p-4 bg-gray-50 rounded-xl sm:col-span-2">
                                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                        <FaMapMarkerAlt className="w-4 h-4" />
                                        Localisation
                                    </p>
                                    <p className="text-gray-900 font-medium">{profil.location}</p>
                                </div>
                            )}
                        </div>

                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Compétences</h2>
                        
                        <div className="space-y-6">
                            {teachSkills.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-3">Maîtrise</p>
                                    <div className="flex flex-wrap gap-2">
                                        {teachSkills.map(skill => (
                                            <span
                                                key={skill.id}
                                                className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-xl border border-blue-100"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {learnSkills.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-3">Veut apprendre</p>
                                    <div className="flex flex-wrap gap-2">
                                        {learnSkills.map(skill => (
                                            <span
                                                key={skill.id}
                                                className="px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-xl border border-green-100"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {teachSkills.length === 0 && learnSkills.length === 0 && (
                                <div className="text-center py-8 bg-gray-50 rounded-xl">
                                    <p className="text-gray-500">Aucune compétence renseignée</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour
                </button>
            </div>
        </div>
    )
}

export default ProfilUser