import { Link } from 'react-router-dom'

function Fonctionnement() {
  const steps = [
    {
      id: 1,
      title: 'Créez votre profil',
      description: 'Inscrivez-vous et renseignez vos compétences : celles que vous maîtrisez et celles que vous souhaitez apprendre.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Explorez les profils',
      description: 'Parcourez les suggestions personnalisées basées sur vos centres d\'intérêt et objectifs d\'apprentissage.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Connectez-vous',
      description: 'Envoyez des demandes de connexion aux personnes avec qui vous souhaitez échanger vos compétences.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Échangez et apprenez',
      description: 'Discutez, planifiez des sessions et partagez vos connaissances dans une dynamique gagnant-gagnant.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ]

  const features = [
    {
      title: 'Match intelligent',
      description: 'Notre algorithme vous suggère les meilleurs profils basés sur vos compétences et objectifs.'
    },
    {
      title: 'Messagerie intégrée',
      description: 'Discutez directement avec vos matchs pour organiser vos échanges.'
    },
    {
      title: 'Communauté active',
      description: 'Rejoignez une communauté de passionnés prêts à partager leurs connaissances.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12">
      {/* Section héros */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez comment SkillSwap facilite l'échange de compétences entre passionnés
          </p>
        </div>
      </div>

      {/* Étapes */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Ligne de connexion (sauf pour le dernier) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
              )}
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors h-full">
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                  {step.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-blue-400">{step.id}</span>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          Pourquoi choisir SkillSwap ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center">
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Prêt à commencer l'aventure ?
        </h2>
        <p className="text-gray-300 mb-6">
          Rejoignez des milliers de personnes qui échangent leurs compétences chaque jour.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/inscription"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Fonctionnement