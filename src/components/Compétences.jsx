import { getAllSkills } from "../api/skills.api"
import { useState, useEffect } from "react"

function Compétences() {
    const [skills, setSkills] = useState([])

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
        <div className="px-6 py-12">
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
                {Object.entries(grouped).map(([categorie, items]) => (
                    <div key={categorie}>
                        <p className="text-xs text-slate-400 mb-3 tracking-widest uppercase">
                            {categorie}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {items.map(skill => (
                                <span
                                    key={skill.id}
                                    className="text-sm text-slate-300 hover:text-white transition-colors duration-150 cursor-default"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Compétences