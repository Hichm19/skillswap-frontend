import { Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/connexion" element={<Connexion/>} />
      <Route path="/inscription" element={<Inscription/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  )
}

export default App