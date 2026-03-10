import { useEffect, useState } from 'react'
import echo from '../echo'
import { getUser } from '../api/auth.api'

function useNotifications() {
    const [notifications, setNotifications] = useState([])
    const currentUser = getUser()

    useEffect(() => {
        if (!currentUser?.id) return

        // S'abonne au canal de l'utilisateur connecté
        const channel = echo.channel(`user.${currentUser.id}`)
        console.log('Abonné au canal :', `user.${currentUser.id}`)

        // Écoute nouveau message
        channel.listen('.new-message', (data) => {
            console.log('Nouveau message reçu :', data)
            setNotifications(prev => [...prev, {
                id: Date.now(),
                type: 'message',
                text: `Nouveau message de ${data.message.sender_id}`,
                data
            }])
        })

        // Écoute nouvelle demande d'ami
        channel.listen('.new-friend-request', (data) => {
            setNotifications(prev => [...prev, {
                id: Date.now(),
                type: 'friend-request',
                text: 'Nouvelle demande d\'ami',
                data
            }])
        })

        // Écoute demande d'ami acceptée
        channel.listen('.friend-request-accepted', (data) => {
            setNotifications(prev => [...prev, {
                id: Date.now(),
                type: 'accepted',
                text: 'Votre demande d\'ami a été acceptée',
                data
            }])
        })

        // Nettoyage quand le composant se démonte
        return () => {
            echo.leaveChannel(`user.${currentUser.id}`)
        }
    }, [currentUser?.id])

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    return { notifications, removeNotification }
}

export default useNotifications