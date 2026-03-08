import React from 'react'
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getUser, islogged } from "../api/auth.api.js";
import { getReceiveFriendRequest, GetAllFriend } from "../api/suggestion.api.js"

function DashUser() {
  const [user , setUser]=useState()
  const navigate = useNavigate()
  const [Request, setRequests]= useState([])
  const [Friends, setFriends]= useState([])

  useEffect(() => {
      if (!islogged()) {
        navigate("/connexion")
        return
      }

      const loadUser = () => {
        const userData = getUser()
        console.log("userData ->", userData)
        setUser(userData)
      }

      loadUser()
  }, [navigate])

  useEffect(() => {
    const loadRequests = async () => {
        try {
            const response = await getReceiveFriendRequest()
            setRequests(response.data.data || [])
            console.log('Requests:', response.data)
        } catch (error) {
            console.error(error)
        }
        
    }
    loadRequests()
}, [])

useEffect(()=>{
  const loadFriends = async () => {
    try {
      const response = await GetAllFriend()
      setFriends(response.data.data || [])
      console.log('Friends:', response.data)
    } catch (error) {
      console.error('Erreur lors du chargement des amis:', error)
    } 
    
  }
  loadFriends()
},[])


  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
             <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                 Bonjour {user.name}
             </h2>
             <p className="text-gray-600">
                Bienvenue sur votre tableau de bord
             </p>
      </div>
          <div className="flex gap-4 ">
              <div className="bg-">
                 <p>{Friends.length} ami{Friends.length > 1 ? 's' : ''} </p>
              </div>
              <div>
                  <p>{Request.length} demande{Request.length > 1 ? 's' : ''} reçue{Request.length > 1 ? 's' : ''}</p>
              </div>
              

          </div>
          <div>
              <button onClick={()=>navigate("/dashboard/mon-profil")}>
                Ajouter une comptétence
              </button>
              <button onClick={()=>navigate("/dashboard/mon-profil")}>
                Modifier profil
              </button>
          </div>
      </div>
    </div>
  )
}

export default DashUser