// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket"],
// });

// export default socket;

import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
});

export default socket;