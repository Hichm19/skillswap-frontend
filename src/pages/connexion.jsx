import React, { useState } from 'react';

function Connexion() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  }); 
  const [error, setError]= useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="
      min-h-screen 
      flex 
      items-center 
      justify-center 
      bg-gradient-to-br 
      from-gray-900 
      via-gray-800 
      to-gray-900
      p-4
    ">
      {/* Conteneur principal */}
      <div className="
        w-full 
        max-w-md
        bg-gray-800 
        rounded-2xl 
        shadow-2xl
        shadow-gray-900/50
        overflow-hidden
        transition-all 
        duration-300
        hover:shadow-gray-900/70
      ">
        {/* En-tête avec décor */}
        <div className="
          relative 
          p-6 
          pb-8
          bg-gray-800
          border-b 
          border-gray-700
        ">
         
          <div className="text-center mb-2">
            <div className="
              w-12 
              h-12 
              bg-gradient-to-br 
              from-blue-500 
              to-indigo-600
              rounded-xl 
              flex 
              items-center 
              justify-center 
              mx-auto 
              mb-4
              shadow-lg
              group
              hover:from-blue-600
              hover:to-indigo-700
              transition-all
              duration-300
            ">
              <svg 
                className="
                  w-6 
                  h-6 
                  text-white 
                  group-hover:scale-110
                  transition-transform
                  duration-300
                " 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            <h1 className="
              text-3xl 
              font-bold 
              text-white
              mb-2
              tracking-tight
            ">
              Connexion
            </h1>
            <p className="
              text-gray-300
              text-sm
              opacity-80
            ">
              Accédez à votre espace personnel
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="p-8 pt-6">
          <form>
            {/* Champ Email */}
            <div className="mb-6">
              <label 
                htmlFor="email" 
                className="
                  block 
                  text-sm 
                  font-medium 
                  text-gray-300
                  mb-2
                "q
              >
                Adresse email
              </label>
              <div className="relative">
                <div className="
                  absolute 
                  inset-y-0 
                  left-0 
                  pl-3 
                  flex 
                  items-center 
                  pointer-events-none
                ">
                  <svg 
                    className="
                      h-5 
                      w-5 
                      text-gray-500
                    " 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  className="
                    w-full 
                    pl-10 
                    pr-4 
                    py-3 
                    border 
                    border-gray-700
                    rounded-xl
                    bg-gray-700
                    text-white
                    placeholder-gray-500
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500 
                    focus:border-transparent
                    transition-all 
                    duration-300
                    hover:border-gray-600
                  "
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="mb-4">
              <label 
                htmlFor="password" 
                className="
                  block 
                  text-sm 
                  font-medium 
                  text-gray-300
                  mb-2
                "
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="
                  absolute 
                  inset-y-0 
                  left-0 
                  pl-3 
                  flex 
                  items-center 
                  pointer-events-none
                ">
                  <svg 
                    className="
                      h-5 
                      w-5 
                      text-gray-500
                    " 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  name="password"
                  required
                  className="
                    w-full 
                    pl-10 
                    pr-12 
                    py-3 
                    border 
                    border-gray-700
                    rounded-xl
                    bg-gray-700
                    text-white
                    placeholder-gray-500
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500 
                    focus:border-transparent
                    transition-all 
                    duration-300
                    hover:border-gray-600
                  "
                  placeholder="••••••••"
                />
                {/* Bouton voir/masquer le mot de passe */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute 
                    inset-y-0 
                    right-0 
                    pr-3 
                    flex 
                    items-center
                    text-gray-500
                    hover:text-gray-300
                    transition-colors 
                    duration-300
                  "
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <svg 
                      className="h-5 w-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                      />
                    </svg>
                  ) : (
                    <svg 
                      className="h-5 w-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Ligne avec "Se souvenir" et "Mot de passe oublié" */}
            <div className="
              flex 
              items-center 
              justify-between 
              mb-8
            ">
             
              <a 
                href="/mot-de-passe-oublie"
                className="
                  text-sm 
                  font-medium 
                  text-blue-400
                  hover:text-blue-300
                  transition-colors 
                  duration-300
                  hover:underline
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:ring-offset-2
                  focus:ring-offset-gray-800
                  rounded
                  px-1
                "
              >
                Mot de passe oublié ?
              </a>
            </div>

         
            <button 
              type="submit"
              className="
                w-full 
                bg-gradient-to-r 
                from-blue-600 
                to-indigo-600
                hover:from-blue-700 
                hover:to-indigo-700
                text-white 
                font-medium 
                py-3 
                px-4 
                rounded-xl
                transition-all 
                duration-300
                transform 
                hover:scale-[1.02] 
                active:scale-[0.98]
                shadow-lg 
                hover:shadow-xl
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                focus:ring-offset-2
                focus:ring-offset-gray-800
                mb-6
                group
                relative
                overflow-hidden
              "
            >
              <span className="relative">Se Connecter</span>
            </button>

            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="
                  px-2 
                  bg-gray-800
                  text-gray-400
                ">
                  Pas encore de compte ?
                </span>
              </div>
            </div>

            
            <div className="text-center">
              <a 
                href="/inscription"
                className="
                  inline-block 
                  w-full 
                  py-3 
                  border 
                  border-gray-700
                  text-gray-300
                  font-medium
                  rounded-xl
                  hover:bg-gray-700/50
                  hover:border-gray-600
                  hover:text-white
                  transition-all 
                  duration-300
                  transform 
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:ring-offset-2
                  focus:ring-offset-gray-800
                "
              >
                Créer un compte
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connexion;