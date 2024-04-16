const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
require("dotenv").config();
const io = new Server(server, {
  cors: "http://app:3000/",
});

const NEXT_URL = "http://app:3000/api/getDocs";

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

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
