import { useState, useEffect } from 'react'
import SuggestionsList from "./SuggestionsList.jsx"
import FriendsList from "./FriendsList.jsx"
import ReceivedRequests from "./ReceivedRequests.jsx"
import SentRequests from "./SentRequests.jsx"

function Suggestions() {
  const [activeTab, setActiveTab] = useState('suggestions')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'suggestions', label: 'Suggestions' },
    { id: 'friends', label: 'Mes amis' },
    { id: 'received', label: "Demandes d'ami reçues" },
    { id: 'sent', label: "Demandes d'ami envoyées" }
  ]

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [activeTab])

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="hidden sm:flex items-center justify-center">
            <nav className="flex space-x-1 md:space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 md:px-6 py-4 text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-b-2 border-transparent'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="sm:hidden">
            <div className="flex items-center justify-between py-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white"
              >
                <span className="font-medium">{tabs.find(t => t.id === activeTab)?.label}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {isMobileMenuOpen && (
              <div className="absolute left-0 right-0 mt-1 mx-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors
                      ${activeTab === tab.id 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                      ${tab.id !== tabs[tabs.length - 1].id ? 'border-b border-gray-100 dark:border-gray-700' : ''}
                    `}
                  >
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-4 sm:py-6">
        {renderContent()}
      </div>
    </div>
  )
}

export default Suggestions