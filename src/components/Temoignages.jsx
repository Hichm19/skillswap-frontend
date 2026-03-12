import { useState } from 'react'

function Temoignages() {
  const [activeIndex, setActiveIndex] = useState(0)

  const temoignages = [
    {
      id: 1,
      nom: "Thomas Martin",
      avatar: "TM",
      role: "Développeur Frontend",
      message: "Grâce à SkillSwap, j'ai appris React avec un développeur expérimenté. Aujourd'hui, je maîtrise le framework et j'ai même trouvé un emploi !",
      note: 5
    },
    {
      id: 2,
      nom: "Sarah Benali",
      avatar: "SB",
      role: "Designer UI/UX",
      message: "Je voulais apprendre le développement web pour mieux collaborer avec les devs. J'ai trouvé quelqu'un pour m'apprendre JavaScript, et en échange je l'ai aidé en design.",
      note: 5
    },
    {
      id: 3,
      nom: "Amadou Diallo",
      avatar: "AD",
      role: "Data Analyst",
      message: "Une communauté incroyable ! J'ai partagé mes connaissances en Python et appris le Machine Learning. Les échanges sont toujours enrichissants.",
      note: 5
    },
    {
      id: 4,
      nom: "Claire Dubois",
      avatar: "CD",
      role: "Chef de projet",
      message: "Je cherchais à améliorer mes compétences en gestion de projet agile. J'ai trouvé un mentor génial et j'ai pu aider quelqu'un avec l'anglais des affaires.",
      note: 5
    }
  ]

  const generateStars = (note) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 ${i < note ? 'text-yellow-400' : 'text-gray-600'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">
            Ce qu'ils disent de SkillSwap
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez les expériences de ceux qui échangent leurs compétences au quotidien
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {temoignages.map(t => (
            <div 
              key={t.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              {/* En-tête avec avatar et infos */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <h3 className="text-white font-medium">{t.nom}</h3>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                "{t.message}"
              </p>

              {/* Note */}
              <div className="flex items-center gap-1">
                {generateStars(t.note)}
              </div>
            </div>
          ))}
        </div>

        {/* Section stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">500+</div>
            <div className="text-sm text-gray-400">Échanges réussis</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">200+</div>
            <div className="text-sm text-gray-400">Membres actifs</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">50+</div>
            <div className="text-sm text-gray-400">Compétences partagées</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Temoignages