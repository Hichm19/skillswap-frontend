import React from 'react';

const Hero = () => {
  return (
    <section className="
      min-h-screen 
      flex 
      items-center 
      justify-center 
      bg-gray-900
      text-white
    ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Contenu principal */}
        <div className="mb-12 space-y-8">
          {/* Titre principal */}
          <h1 className="
            text-4xl 
            md:text-6xl 
            lg:text-7xl 
            font-light 
            tracking-tight 
            text-white
            leading-tight
          ">
            <span className="block opacity-90">Learn.</span>
            <span className="block opacity-80">Share.</span>
            <span className="block opacity-100 font-medium">Match skills.</span>
          </h1>
          
          {/* Sous-titre */}
          <p className="
            text-lg 
            md:text-xl 
            text-gray-300
            max-w-2xl 
            mx-auto 
            font-light
            leading-relaxed
          ">
            Connectez ce que vous savez avec ce que vous voulez apprendre.
            <br />
            <span className="text-blue-400">
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
            text-white 
            font-medium 
            rounded-xl
            hover:bg-blue-700
            transition-colors
            w-full 
            sm:w-auto
          ">
            Trouver un match
          </button>
          
          {/* Bouton secondaire */}
          <button className="
            px-8 
            py-4
            bg-gray-800
            text-white
            font-medium
            rounded-xl
            border
            border-gray-700
            hover:bg-gray-700
            transition-colors
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