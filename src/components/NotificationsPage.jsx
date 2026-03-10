import useNotifications from '../hook/useNotifications'

function NotificationsPage() {
    const { notifications, removeNotification } = useNotifications()

    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-slate-100 text-base font-semibold mb-6">Notifications</h1>

            {notifications.length === 0 ? (
                <p className="text-slate-600 text-sm">Aucune notification</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {notifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-sm border
                                ${notif.type === 'message'
                                    ? 'bg-[#0b1628] border-blue-800/40 text-blue-300'
                                    : notif.type === 'friend-request'
                                    ? 'bg-[#0b1628] border-violet-800/40 text-violet-300'
                                    : 'bg-[#0b1628] border-emerald-800/40 text-emerald-300'
                                }`}
                        >
                            <span>{notif.text}</span>
                            <button
                                onClick={() => removeNotification(notif.id)}
                                className="text-slate-500 hover:text-slate-300 transition-colors leading-none"
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