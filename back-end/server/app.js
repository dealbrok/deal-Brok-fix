if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config
}

const express = require('express')
const cors = require("cors")
const app = express()
const router = require("./routes/index")
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const errorHandler = require('./middleware/errorHandler')
const { emit } = require('node:process')
const port = process.env.PORT || 3000


app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  let roomNumber = 1

  socket.on('hello', (arg) => {
    console.log(arg);
  });

  socket.on('create-room', () => {
    socket.join(roomNumber)
    io.to(roomNumber).emit("welcome", "Hello, Good Morning");
    console.log(roomNumber);
    roomNumber++
  })
})

app.use(errorHandler)

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

