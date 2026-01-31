import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="bg-white px-4 py-2 shadow-md">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/">SkillSwap</Link>

            <div className="flex gap-6">
                <Link to="/">Accueil</Link>
                <Link to="/">Explorer</Link>
                <Link to="/">Fonctionnements</Link>
            </div>
            <div className="flex gap-4">
                <Link to="/connexion">Se connecter</Link>
                <Link to="/inscription">S'inscrire</Link>
            </div>
        </nav>
    </div>
  )
}

export default NavBar