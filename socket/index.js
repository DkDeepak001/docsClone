const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
require("dotenv").config();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const NEXT_URL = "http://localhost:3000/api/getDocs";

io.on("connection", (socket) => {
  socket.on("get-documents", async (documentId) => {
    const res = await fetch(NEXT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentId }),
    });

    const data = await res.json();
    console.log(data.message);
    socket.emit("loaded-documents", data);
    socket.join(documentId);
    socket.on("send-changes", (delta) => {
      console.log("delta", delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
  });
});

server.listen(8000, () => {
  console.log("listening on *:8000");
});
