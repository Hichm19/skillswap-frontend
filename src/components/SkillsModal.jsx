import { useState, useEffect } from "react"
import { getAllSkills, getMySkills, addSkill, removeSkill } from "../api/skills.api"

function SkillsModal({ onClose }) {
    const [allSkills, setAllSkills] = useState([])
    const [mySkills, setMySkills] = useState([])

    useEffect(() => {
        const load = async () => {
            const [allRes, myRes] = await Promise.all([getAllSkills(), getMySkills()])
            setAllSkills(allRes.data ?? [])
            setMySkills(myRes.data.skills ?? [])
        }
        load()
    }, [])

    const hasSkill = (skillId, type) =>
        mySkills.some(s => s.id === skillId && s.pivot.type === type)

    const toggle = async (skillId, type) => {
        if (hasSkill(skillId, type)) {
            await removeSkill(skillId)
            setMySkills(prev => prev.filter(s => !(s.id === skillId && s.pivot.type === type)))
        } else {
            await addSkill(skillId, type)
            const skill = allSkills.find(s => s.id === skillId)
            setMySkills(prev => [...prev, { ...skill, pivot: { type } }])
        }
    }

    const grouped = allSkills.reduce((acc, skill) => {
        if (!acc[skill.categorie]) acc[skill.categorie] = []
        acc[skill.categorie].push(skill)
        return acc
    }, {})

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => onClose(false)}
        >
            <div
                className="bg-[#0b1628] border border-white/8 rounded-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto p-6 flex flex-col gap-8"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-100 text-base font-semibold">Mes compétences</h2>
                    <button
                        onClick={() => onClose(false)}
                        className="text-slate-500 hover:text-slate-300 transition-colors text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {["teach", "learn"].map(type => (
                    <div key={type}>
                        <div className="flex items-center gap-3 mb-5">
                            <span className={`w-1.5 h-5 rounded-full ${type === "teach" ? "bg-blue-500" : "bg-emerald-500"}`} />
                            <p className={`text-sm font-semibold tracking-wide ${type === "teach" ? "text-blue-400" : "text-emerald-400"}`}>
                                {type === "teach" ? "Ce que je maîtrise" : "Ce que je veux apprendre"}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            {Object.entries(grouped).map(([categorie, items]) => (
                                <div key={categorie}>
                                    <p className="text-xs text-slate-600 mb-2">{categorie}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map(skill => {
                                            const active = hasSkill(skill.id, type)
                                            return (
                                                <button
                                                    key={skill.id}
                                                    onClick={() => toggle(skill.id, type)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 cursor-pointer
                                                        ${active
                                                            ? type === "teach"
                                                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                                                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                                            : "bg-white/5 text-slate-400 border border-white/8 hover:text-slate-200 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {skill.name}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => onClose(true)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-150"
                >
                    Mettre à jour
                </button>
            </div>
        </div>
    )
}

export default SkillsModal