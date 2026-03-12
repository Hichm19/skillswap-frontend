import { useNavigate } from 'react-router-dom'
import useNotifications from '../hook/useNotifications'

function NotificationsPage() {
    const { notifications, removeNotification, markAsRead } = useNotifications()
    const navigate = useNavigate()

    const sortedNotifications = [...notifications].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    const handleNotificationClick = (notif) => {
        markAsRead(notif.id)
        
        if (notif.type === 'message' || notif.type === 'accepted') {
            navigate('/dashboard/messages')
        } else if (notif.type === 'friend-request') {
            navigate('/dashboard/suggestions', { state: { tab: 'received' } })
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now - date
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return "À l'instant"
        if (diffMins < 60) return `Il y a ${diffMins} min`
        if (diffHours < 24) return `Il y a ${diffHours}h`
        if (diffDays === 1) return "Hier"
        if (diffDays < 7) return `Il y a ${diffDays} jours`
        return date.toLocaleDateString('fr-FR')
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-xl font-medium text-gray-900 mb-6">Notifications</h1>

            {sortedNotifications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucune notification</p>
            ) : (
                <div className="space-y-2">
                    {sortedNotifications.map(notif => (
                        <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`
                                flex items-start justify-between gap-4 p-4 bg-white rounded-lg border 
                                cursor-pointer hover:bg-gray-50 transition-colors
                                ${!notif.read ? 'border-l-4 border-l-blue-500' : 'border border-gray-200'}
                            `}
                        >
                            <div className="flex-1">
                                <p className={`
                                    text-sm
                                    ${!notif.read ? 'text-gray-900 font-medium' : 'text-gray-600'}
                                `}>
                                    {notif.text}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {formatDate(notif.createdAt)}
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeNotification(notif.id)
                                }}
                                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NotificationsPage