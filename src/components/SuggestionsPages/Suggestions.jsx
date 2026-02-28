import React, { useState } from 'react'
import SuggestionsList from "./SuggestionsList.jsx"
import FriendsList from "./FriendsList.jsx"
import ReceivedRequests from "./ReceivedRequests.jsx"
import SentRequests from "./SentRequests.jsx"

function Suggestions() {
  const [activeTab, setActiveTab] = useState('suggestions')

  const tabs = [
    { id: 'suggestions', label: 'Suggestions' },
    { id: 'friends', label: 'Mes amis' },
    { id: 'received', label: 'Demandes reçues' },
    { id: 'sent', label: 'Demandes envoyées' }
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'suggestions':
        return <SuggestionsList />
      case 'friends':
        return <FriendsList />
      case 'received':
        return <ReceivedRequests />
      case 'sent':
        return <SentRequests />
      default:
        return <SuggestionsList />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <nav className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-6 py-4 text-sm font-medium transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="py-6">
        {renderContent()}
      </div>
    </div>
  )
}

export default Suggestions