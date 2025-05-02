if (process.env.NODE_ENV !== "production") {
  require("dotenv").config;
}

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 3000;

app.use(cors());

/* nanti kalau mau deploy jangan lupa masukin link deploy vercel*/

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId, name }) => {
    socket.join(roomId);
    socket.emit("messagesFromServer", { message: "Welcome to the room!" });
  });

  socket.on("newMessages", (messages, roomId) => {
    io.to(roomId).emit("messagesFromServer", messages);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(errorHandler);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
