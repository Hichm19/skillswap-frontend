import { useState } from 'react'
import { UpdateProfil } from "../api/users.api"

function ModifProfil({ profil, onClose }) {
    const [name, setName] = useState(profil.name)
    const [email, setEmail] = useState(profil.email)
    const [bio, setBio] = useState(profil.bio ?? "")

    const handleSubmit = async () => {
        console.log("données envoyées :", { name, email, bio })
        const response = await UpdateProfil({ name, email, bio })
        console.log("réponse :", response)
        onClose(true)
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => onClose(false)}
        >
            <div
                className="bg-[#0b1628] border border-white/8 rounded-2xl w-full max-w-md p-6 flex flex-col gap-6"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-slate-100 text-base font-semibold">Modifier le profil</h2>
                    <button
                        onClick={() => onClose(false)}
                        className="text-slate-500 hover:text-slate-300 transition-colors text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Champs */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500 uppercase tracking-widest">Nom</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500 uppercase tracking-widest">Email</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500 uppercase tracking-widest">Bio</label>
                        <textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            rows={3}
                            className="bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* Bouton */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-150"
                >
                    Sauvegarder
                </button>
            </div>
        </div>
    )
}

export default ModifProfil