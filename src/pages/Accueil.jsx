import React from 'react'
import Hero from "../components/Hero"  
import NavBar from '../components/NavBar.jsx';
import Explorer from '../components/Explorer.jsx';
import Fonctionnement from '../components/Fonctionnement.jsx';
import Temoignages from '../components/Temoignages.jsx';
import Footer from '../components/Footer.jsx';

function Accueil() {
  return (
    <div>
        <NavBar/>
        <Hero/>
        <div id="explorer">
          <Explorer/>
        </div>
        <div id="fonctionnement">
          <Fonctionnement/>
        </div>
        <div id="temoignages">
          <Temoignages/>
        </div>
        <Footer/>
    </div>
  )
}   

export default Accueil;