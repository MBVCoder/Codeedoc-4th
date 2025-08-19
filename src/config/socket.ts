import { io } from 'socket.io-client';

const socketServer = import.meta.env.VITE_SOCKET_SERVER;
export const socket = io(socketServer, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Socket connected", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error", err);
});
