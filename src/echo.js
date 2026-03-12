import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "reverb",
    key: "9zxwjb7prouwe81ebgtl",
    wsHost: "localhost",
    wsPort: 9000,
    wssPort: 9000,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws'],
});

echo.connector.pusher.connection.bind('connected', () => {
    console.log('Reverb connecté !')
})

echo.connector.pusher.connection.bind('error', (err) => {
    console.log('Erreur Reverb :', err)
})

export default echo;