import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "reverb",
    key: "9zxwjb7prouwe81ebgtl",
    wsHost: "127.0.0.1",
    wsPort: 9000,
    forceTLS: false,
    disableStats: true,
    cluster: "mt1"
});

export default echo;