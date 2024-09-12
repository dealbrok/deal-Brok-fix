const express = require('express')
const authentication = require('../middleware/authentication')
const { login, register } = require('../controller/userController')
const { uploadImage } = require('../controller/uploadImageController')
const { fetchData, fetchId, postData, deleteRoomById } = require('../controller/roomController')
const upload = require("../helper/multer")
const app = express()

app.post("/login", login)
app.post("/register", register)

app.use(authentication)

app.post('/upload', upload.single('image'), uploadImage)

app.get("/room", fetchData)
app.get("/room/:id", fetchId)
app.post("/room", postData)
app.delete("/room/:id", deleteRoomById)

module.exports = app