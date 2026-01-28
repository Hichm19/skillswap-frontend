import React from 'react'

function NavBar() {
  return (
    <div>
        <nav>
            <link to="/">SkillSwap</link>

            <div>
                <link to ="/">Accueil</link>
                <link to ="/">Explorer</link>
                <link to ="/">Fonctionnements</link>
            </div>
            <div>
                <link to ="/connexion">Se connecter</link>
                <link to ="/inscription">S'inscrire</link>
            </div>
        </nav>
    </div>
  )
}

export default NavBar