import { useState, useEffect } from 'react';

const Hero = () => {
  // État pour gérer le mode sombre/clair
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Effet pour appliquer le mode au body pour tout le site
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <section className="
      min-h-screen 
      flex 
      items-center 
      justify-center 
      bg-white 
      dark:bg-gray-900 
      transition-colors 
      duration-300
    ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Bouton de toggle mode sombre/clair */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="
              p-2
              rounded-full
              bg-gray-100
              dark:bg-gray-800
              hover:bg-gray-200
              dark:hover:bg-gray-700
              transition-all
              duration-300
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              dark:focus:ring-offset-gray-900
            "
            aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {/* Icône soleil (mode clair) */}
            <svg
              className={`w-5 h-5 text-yellow-500 ${isDarkMode ? 'block' : 'hidden'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            
            {/* Icône lune (mode sombre) */}
            <svg
              className={`w-5 h-5 text-blue-400 ${!isDarkMode ? 'block' : 'hidden'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>

        {/* Contenu principal */}
        <div className="mb-12 space-y-8">
          {/* Titre principal */}
          <h1 className="
            text-4xl 
            md:text-6xl 
            lg:text-7xl 
            font-light 
            tracking-tight 
            text-gray-900 
            dark:text-white 
            leading-tight
          ">
            {/* Explication : J'utilise "block" pour forcer chaque mot sur une nouvelle ligne */}
            <span className="block opacity-90">Learn.</span>
            <span className="block opacity-80">Share.</span>
            <span className="block opacity-100 font-medium">Match skills.</span>
          </h1>
          
          {/* Sous-titre */}
          <p className="
            text-lg 
            md:text-xl 
            text-gray-600 
            dark:text-gray-300 
            max-w-2xl 
            mx-auto 
            font-light
            leading-relaxed
          ">
            Connectez ce que vous savez avec ce que vous voulez apprendre.
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              Des échanges intelligents, des rencontres significatives.
            </span>
          </p>
        </div>
        <div className="
          flex 
          flex-col 
          sm:flex-row 
          gap-4 
          justify-center 
          items-center
        ">
          
          {/* Bouton principal */}
          <button className="
            px-8 
            py-4
            bg-blue-600 
            dark:bg-blue-500
            text-white 
            font-medium 
            rounded-xl
            hover:bg-blue-700
            dark:hover:bg-blue-600
            transition-all
            duration-300
            transform
            hover:scale-105
            active:scale-95
            shadow-lg
            hover:shadow-xl
            dark:shadow-blue-500/20
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            dark:focus:ring-offset-gray-900
            w-full 
            sm:w-auto
          ">
            Trouver un match
          </button>
          
          {/* Bouton secondaire */}
          <button className="
            px-8 
            py-4
            bg-white
            dark:bg-gray-800
            text-gray-800
            dark:text-gray-200
            font-medium
            rounded-xl
            border
            border-gray-200
            dark:border-gray-700
            hover:border-gray-300
            dark:hover:border-gray-600
            hover:bg-gray-50
            dark:hover:bg-gray-700
            transition-all
            duration-300
            transform
            hover:scale-105
            active:scale-95
            shadow-lg
            hover:shadow-xl
            focus:outline-none
            focus:ring-2
            focus:ring-gray-200
            dark:focus:ring-gray-700
            focus:ring-offset-2
            dark:focus:ring-offset-gray-900
            w-full 
            sm:w-auto
          ">
            Partager mes compétences
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;