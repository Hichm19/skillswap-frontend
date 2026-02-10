import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Inscription() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  }); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nom.trim() || formData.email.trim() || formData.password.trim() || formData.confirmPassword.trim()){
      setError("veuillez remplir tous les champs")
      return;
    }
    
    if (formData.password != formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(formData.email.trim())){
      setError("Format de l'email invalide")
      return;
    }
    
    if (formData.password.length<6) {
      setError ("Le mot de passe doit dépassé  caractères")
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      
      const response = await register(formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    } 
  };

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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
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
              Inscription
            </h1>
            <p className="
              text-gray-300
              text-sm
              opacity-80
            ">
              Rejoignez SkillSwap dès maintenant
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Champ Nom & Prénom */}
            <div className="mb-6">
              <label 
                htmlFor="nom" 
                className="
                  block 
                  text-sm 
                  font-medium 
                  text-gray-300
                  mb-2
                "
              >
                Nom & Prénom
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
                    className="h-5 w-5 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                </div>
                <input 
                  type="text" 
                  id="nom" 
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
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
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                "
              >
                Email
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
                    className="h-5 w-5 text-gray-500" 
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
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="exemple@gmail.com"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="mb-6">
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
                    className="h-5 w-5 text-gray-500" 
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
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
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <p className="mt-1 text-xs text-gray-400">
                Minimum 6 caractères
              </p>
            </div>

            {/* Champ Confirmation de mot de passe */}
            <div className="mb-8">
              <label 
                htmlFor="confirmPassword" 
                className="
                  block 
                  text-sm 
                  font-medium 
                  text-gray-300
                  mb-2
                "
              >
                Confirmer le mot de passe
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
                    className="h-5 w-5 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Bouton d'inscription */}
            <button 
              type="submit"
              disabled={loading}
              className="
                w-full 
                bg-gradient-to-r 
                from-blue-600 
                to-indigo-600
                hover:from-blue-700 
                hover:to-indigo-700
                disabled:from-gray-600
                disabled:to-gray-700
                disabled:cursor-not-allowed
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
                disabled:hover:scale-100
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
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Inscription en cours...
                </div>
              ) : (
                <span className="relative">S'inscrire</span>
              )}
            </button>

            {/* Séparateur */}
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
                  Déjà un compte ?
                </span>
              </div>
            </div>

            {/* Lien vers connexion */}
            <div className="text-center">
              <a 
                href="/connexion"
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
                Se connecter
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Inscription;