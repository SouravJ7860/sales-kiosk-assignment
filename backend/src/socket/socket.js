import { Server } from "socket.io";

let io;

export const ROOM_NAME = "sales-kiosk";

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Client Connected:", socket.id);

        socket.join(ROOM_NAME);

        console.log(`${socket.id} joined ${ROOM_NAME}`);

        // Gallery - Open Preview
        socket.on("gallery:open", (image) => {
            socket.to(ROOM_NAME).emit("gallery:open", image);
        });

        // Gallery - Close Preview
        socket.on("gallery:close", () => {
            socket.to(ROOM_NAME).emit("gallery:close");
        });

        // ===============================
        // Videos
        // ===============================

        // Play video
        socket.on("video:play", (data) => {
            console.log("VIDEO PLAY RECEIVED:", data);

            socket.to(ROOM_NAME).emit("video:play", data);
        });

        // Pause video
        socket.on("video:pause", (data) => {
            console.log("VIDEO PAUSE RECEIVED:", data);

            socket.to(ROOM_NAME).emit("video:pause", data);
        });

        // ===============================
        // Booking Modal
        // ===============================

        socket.on("booking:open", (unit) => {
            socket.to(ROOM_NAME).emit("booking:open", unit);
        });

        socket.on("booking:close", () => {
            socket.to(ROOM_NAME).emit("booking:close");
        });

        // ===============================
        // Navigation Sync
        // ===============================

        socket.on("route:change", (path) => {
            console.log("ROUTE CHANGE:", path);

            socket.to(ROOM_NAME).emit("route:change", path);
        });

        // DIS-CONNECT
        socket.on("disconnect", () => {
            console.log("Client Disconnected:", socket.id);
        });
    });
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;
};