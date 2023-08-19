const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  socket.on("get-documents", (documentId) => {
    socket.emit("loaded-documents", documentId + "loaded");
    socket.join(documentId);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
});

server.listen(8000, () => {
  console.log("listening on *:8000");
});
