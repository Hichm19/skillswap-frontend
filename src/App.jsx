import { Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/connexion" element={<Connexion/>} />
      <Route path="/inscription" element={<Inscription/>} />
    </Routes>
  )
}

export default App