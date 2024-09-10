if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config
}

const express = require('express')
const cors = require("cors")
const app = express()
const router = require("./routers/index")
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const port = process.env.PORT || 3000

app.use(cors())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})