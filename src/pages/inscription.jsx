import React from 'react'

function inscription() {
  return (
    <div>
        <h2>Connexion</h2>
        <form>
          <div>
           <label htmlFor="name">Nom et prenom</label>
            <input type="text" id='nom' name='nom' />
          </div>
          <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
          </div>
          <div>
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" />
          </div>
          <div>
              <label>Comfirmation de mot passe</label>
              <input type="password" id="ConfirmPassword" name="password" />
          </div>

          <button type='submit'>S'inscrire</button>

        </form>

    </div>
  )
}

export default inscription