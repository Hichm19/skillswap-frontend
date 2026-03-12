import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import echo from '../echo'
import { getUser } from '../api/auth.api'

function useNotifications() {
    const [notifications, setNotifications] = useState([])
    const currentUser = getUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser?.id) return

        const channel = echo.channel(`user.${currentUser.id}`)

        channel.listen('.new-message', (data) => {
            setNotifications(prev => [...prev, {
                id: Date.now(),
                type: 'message',
                text: `Nouveau message de ${data.message.sender.name}`,
                action: () => navigate('/dashboard/messages')
            }])
        })

        channel.listen('.new-friend-request', (data) => {
            
            console.log('📨 Données reçues:', data); 
            console.log('friendRequest:', data.friendRequest); 

            setNotifications(prev => [...prev, {
                id: Date.now(),
                type: 'friend-request',
                text: `${data.friendRequest.sender.name} vous a envoyé une demande d'ami`,
                action: () => navigate('/dashboard/notifications')
            }])
        })

        channel.listen('.friend-request-accepted', (data) => {
            setNotifications(prev => [...prev, {
                id: Date.now(),
                type: 'accepted',
                text: `${data.friendRequest.receiver.name} a accepté votre demande`,
                action: () => navigate('/dashboard/messages')
            }])
        })

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