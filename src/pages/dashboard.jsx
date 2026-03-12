import React from 'react'
import SideBar from "../components/SideBar" 
import { getUser } from "../api/auth.api.js"
import { Outlet, useNavigate } from "react-router-dom"
import Notifications from "../components/Notifications.jsx"

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      <Notifications />
    </div>
  )
}

export default Dashboard