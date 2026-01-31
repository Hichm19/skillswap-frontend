import { Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Connexion from './pages/connexion';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/connexion" element={<Connexion/>} />
    </Routes>
  )
}

export default App