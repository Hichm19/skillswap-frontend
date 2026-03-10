import { Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Messages from "./components/Messages";
import DashUser from "./components/DashUser"
import Suggestion from "./components/SuggestionsPages/Suggestions"
import ProfilUser from "./components/ProfilUser.jsx" 
import MonProfil from "./components/MonProfil.jsx"
import Compétences from "./components/Compétences.jsx"
import NotificationsPage from "./components/NotificationsPage.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/connexion" element={<Connexion/>} />
      <Route path="/inscription" element={<Inscription/>} />
      
      <Route element ={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}>
              <Route index element={<DashUser/>} />
              <Route path="messages" element={<Messages/>} />
              <Route path="suggestions" element={<Suggestion/>} />
              <Route path="profil/:id" element={<ProfilUser/>} />
              <Route path="mon-profil" element={<MonProfil/>} />
              <Route path="notifications" element={<NotificationsPage/>} />
          </Route>
          
      </Route>

    </Routes>
  )
}

export default App