import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-white">
          <span className="text-blue-400">Skill</span>Swap
        </Link>
        
        <div className="flex gap-6">
          <Link to="/mentions-legales" className="text-xs text-gray-400 hover:text-white">
            Mentions
          </Link>
          <Link to="/confidentialite" className="text-xs text-gray-400 hover:text-white">
            Confidentialité
          </Link>
          <Link to="/cgu" className="text-xs text-gray-400 hover:text-white">
            CGU
          </Link>
        </div>
        
        <p className="text-xs text-gray-500">
          © {currentYear} SkillSwap
        </p>
      </div>
    </footer>
  )
}

export default Footer