import React from 'react'
import {me} from "../api/auth.api"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";

function MonProfil() {
  const [profil, setProfil]= useState(null)

  useEffect(()=>{
    const LoadProfil = async () => {
      const response = await me()
      setProfil(response.data.user)
      console.log(response.data)
    }
    LoadProfil()
  },[])

  const getInitials = (name) => {
    return name
        .split(' ')           
        .map(word => word[0]) 
        .join('')             
        .toUpperCase()        
        .slice(0, 2);         
    }

    if (!profil) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <p className="text-gray-400">Chargement...</p>
          </div>
      )
    }
    
  return (

    <div>
      <div className="flex flex-col items-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                      {profil.profile_picture ? (
                          <img src={profil.profile_picture} alt={profil.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                          <span className="text-xl font-semibold text-white">{getInitials(profil.name)}</span>
                      )}
                  </div>
                  <h1 className="text-xl font-semibold text-gray-900">{profil.name}</h1>
                  <p className="mt-1 text-gray-400 text-sm">{profil.bio ?? "Aucune bio"}</p>
              </div>
        
    </div>
  )
}

export default MonProfil