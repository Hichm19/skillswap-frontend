import { getAllSkills } from "../api/skills.api"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Compétences() {
    const [skills, setSkills] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadSkills = async () => {
            const response = await getAllSkills()
            setSkills(response.data ?? [])
        }
        loadSkills()
    }, [])

    const grouped = skills.reduce((acc, skill) => {
        if (!acc[skill.categorie]) acc[skill.categorie] = []
        acc[skill.categorie].push(skill)
        return acc
    }, {})

    return (
        <div className="p-4 sm:p-6">
            {/* Bouton retour flèche */}
            <button 
                onClick={() => navigate(-1)}
                className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            {/* Titre */}
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                Compétences
            </h1>

            {/* Liste des compétences */}
            <div className="space-y-6 sm:space-y-8">
                {Object.entries(grouped).map(([categorie, items]) => (
                    <div key={categorie}>
                        <p className="text-xs text-gray-400 mb-3 font-medium">
                            {categorie}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {items.map(skill => (
                                <span
                                    key={skill.id}
                                    className="text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Message si aucune compétence */}
            {skills.length === 0 && (
                <p className="text-gray-400 text-center py-8">
                    Aucune compétence disponible
                </p>
            )}
        </div>
    )
}

export default Compétences