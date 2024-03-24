import http from "http";
import express from "express";
import ViteExpress from "vite-express";
import { Server as IOServer } from "socket.io";
import IOEvents from "./socket.io/IOEvents";
import ChatRoomController from "./controllers/ChatRoomController";
import User from "./models/User";

const app = express();

const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
const port: number = //? avoids extra string->number parsing
  process.env.PORT ? parseInt(process.env.PORT) : 3000;

const roomController = new ChatRoomController(io);

io.on(IOEvents.connection, (socket) => {
  //? new user
  const user: User = User.create(socket);
  //? find or create a room for the user + add to room
  const room = roomController.addUserToValidChatRoom(user, 2);

  socket.on(IOEvents.disconnect, () => {
    room.removeUser(user);
  });
});

httpServer.listen(port, () => {
  console.log("Server is listening...");
});

ViteExpress.bind(app, httpServer);
