import useNotifications from '../hook/useNotifications'

function Notifications() {
    const { notifications, removeNotification } = useNotifications()

    if (notifications.length === 0) return null

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
            {notifications.map(notif => (
                <div
                    key={notif.id}
                    onClick={notif.action}
                    className={`
                        flex items-center justify-between gap-4
                        px-4 py-3 rounded-xl text-sm
                        border shadow-lg cursor-pointer
                        ${notif.type === 'message'
                            ? 'bg-[#0b1628] border-blue-800/40 text-blue-300'
                            : notif.type === 'friend-request'
                            ? 'bg-[#0b1628] border-violet-800/40 text-violet-300'
                            : 'bg-[#0b1628] border-emerald-800/40 text-emerald-300'
                        }
                    `}
                >
                    <span>{notif.text}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notif.id)
                        }}
                        className="text-slate-500 hover:text-slate-300 transition-colors leading-none"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Notifications