const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected. Socket_id:${socket.id}`);
  
    //here we becomme the room name from the frontend => socket.emit("join_room",room);
    //We create an event that listens with .on and call it whatever we want, for example, join_room.
    socket.on("join_room", (room_id) => {
   
    socket.join(room_id);
    //console.log(`User with ID: ${socket.id} joined room: ${room_id}`);

  });

  socket.on("send_message", (objectMessage) => {
    socket.to(objectMessage.room).emit("receive_message", objectMessage);
    //console.log(objectMessage);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("CHAT SERVER RUNNING");
});
