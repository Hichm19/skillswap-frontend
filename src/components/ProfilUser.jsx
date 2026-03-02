
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {GetUserById} from '../api/users.api.js'

function ProfilUser() {
    const [profil, setProfil]= useState(null)
    const { id } = useParams()

    useEffect(()=>{
      const LoadData = async () => {
           const response = await GetUserById(id)
           setProfil(response.data.data)
           console.log(response.data);
        }
        LoadData()
        
    }, [id])
  return (
    {profil===null?(
      <p>Chargement...</p>
    ):(
      <div
          style={{ cursor: 'pointer', width: '100%', paddingTop: '100%', position: 'relative', backgroundColor: '#d8dadf' }}
       >

         
      </div>
      <p>profil.name</p>
      {
        profil.bio===null ?<p>Aucune bio</p> : <p>profil.bio</p>
      }
      <div>
    <h3>Skills</h3>
    
    {/* Skills à apprendre */}
    {profil.skills?.filter(s => s.pivot.type === "learn").length > 0 && (

        {profil.skills?.filter(s => s.pivot.type === "teach").length > 0 && (
        <div>
            <p>Maîtrisé :</p>
            <ul>
                {profil.skills
                    .filter(s => s.pivot.type === "teach")
                    .map(skill => (
                        <li key={skill.id}>{skill.name}</li>
                    ))
                }
            </ul>00
        </div>
    )}     
        <div>
            <p>À apprendre :</p>
            <ul>
                {profil.skills
                    .filter(s => s.pivot.type === "learn")
                    .map(skill => (
                        <li key={skill.id}>{skill.name}</li>
                    ))
                }
            </ul>
        </div>
    )}
    
    
    
</div>

    )}
    
  )
}

export default ProfilUser