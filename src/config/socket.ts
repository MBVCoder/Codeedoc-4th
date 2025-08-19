import { io } from 'socket.io-client';

const socketServer = import.meta.env.VITE_SOCKET_SERVER;
export const socket = io(socketServer, {
  transports: ["websocket"],
});
