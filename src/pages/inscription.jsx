import React, { useState } from 'react';

function Inscription() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* En-tête */}
        <div className="p-6 border-b border-gray-700">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">Inscription</h1>
            <p className="text-gray-400 text-sm mt-1">Créez votre compte</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="p-6">
          <form>
            
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 mb-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>

            {/* Mot de passe */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Minimum 8 caractères avec majuscule, minuscule et chiffre
              </p>
            </div>

            {/* Confirmation mot de passe */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            {/* Bouton d'inscription */}
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4"
            >
              S'inscrire
            </button>

            {/* Lien de connexion */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Déjà un compte ?{' '}
                <a href="/connexion" className="text-blue-400 hover:text-blue-300">
                  Se connecter
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inscription;