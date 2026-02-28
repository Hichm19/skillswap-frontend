import React from 'react'
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getUser, islogged } from "../api/auth.api.js";

function DashUser() {
  const [user , setUser]=useState()
  const navigate = useNavigate()

  useEffect(() => {
      if (!islogged()) {
        navigate("/connexion")
        return
      }

      const loadUser = () => {
        const userData = getUser()
        console.log("userData →", userData)
        setUser(userData)
      }

      loadUser()
  }, [navigate])

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Bonjour {user.name}
        </h2>
        <p className="text-gray-600">
          Bienvenue sur votre tableau de bord
        </p>
      </div>
    </div>
  )
}

export default DashUser