import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavBar() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      // Si on n'est pas sur la page d'accueil, on y va d'abord
      window.location.href = `/#${sectionId}`
    } else {
      // Si on est sur la page d'accueil, on scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 fixed top-0 w-full z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-white">
          <span className="text-blue-400">Skill</span>Swap
        </Link>

        {/* Liens navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Accueil
          </Link>
          
          {/* Liens avec scroll sur la page d'accueil */}
          <button
            onClick={() => scrollToSection('explorer')}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Explorer
          </button>
          
          <button
            onClick={() => scrollToSection('fonctionnement')}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Fonctionnement
          </button>

          <button
            onClick={() => scrollToSection('temoignages')}
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Témoignages
          </button>
        </div>

        {/* Boutons connexion/inscription */}
        <div className="flex items-center gap-3">
          <Link 
            to="/connexion" 
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Se connecter
          </Link>
          <Link 
            to="/inscription" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            S'inscrire
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default NavBar