import React from 'react'

function connexion() {
  return (
    <div>
        <h2>Connexion</h2>
        <form action="">
            <div>
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email" />
            </div>
            <div>
                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" name="password" />
            </div>
            <button type='submit'>Se Connecter</button>
        </form>
    </div>
  )
}

export default connexion