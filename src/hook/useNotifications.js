import { useEffect, useState } from 'react'
import echo from '../echo'
import { getUser } from '../api/auth.api'

function useNotifications() {
    const [notifications, setNotifications] = useState([])
    const currentUser = getUser()

    useEffect(() => {
        if (!currentUser?.id) return

        // Charger les notifications sauvegardées
        const saved = localStorage.getItem(`notifications_${currentUser.id}`)
        if (saved) {
            setNotifications(JSON.parse(saved))
        }

        // Écouter les nouveaux événements
        const channel = echo.channel(`user.${currentUser.id}`)

        channel.listen('.new-message', (data) => {
            const newNotif = {
                id: Date.now(),
                type: 'message',
                text: `Nouveau message de ${data.message.sender.name}`,
                read: false,
                createdAt: new Date().toISOString()
            }
            setNotifications(prev => [newNotif, ...prev])
        })

        channel.listen('.new-friend-request', (data) => {
            const newNotif = {
                id: Date.now(),
                type: 'friend-request',
                text: `${data.friendRequest.sender.name} vous a envoyé une demande d'ami`,
                read: false,
                createdAt: new Date().toISOString()
            }
            setNotifications(prev => [newNotif, ...prev])
        })

        channel.listen('.friend-request-accepted', (data) => {
            const newNotif = {
                id: Date.now(),
                type: 'accepted',
                text: `${data.friendRequest.receiver.name} a accepté votre demande`,
                read: false,
                createdAt: new Date().toISOString()
            }
            setNotifications(prev => [newNotif, ...prev])
        })

        return () => {
            echo.leaveChannel(`user.${currentUser.id}`)
        }
    }, [currentUser?.id])

    // Sauvegarder dans localStorage
    useEffect(() => {
        if (currentUser?.id) {
            localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(notifications))
        }
    }, [notifications, currentUser?.id])

    // Fonctions utilitaires
    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    const markAsRead = (id) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
    }

    return { 
        notifications, 
        removeNotification, 
        markAsRead
    }
}

export default useNotifications