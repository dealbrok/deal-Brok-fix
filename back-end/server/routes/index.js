const express = require('express')
const { login, register } = require('../controller/userController')
const authentication = require('../middleware/authentication')
const { uploadImage } = require('../controller/uploadImageController')
const upload = require("../helper/multer")
const { fetchData, fetchId, postData } = require('../controller/roomController')
const app = express()

app.post("/login", login)
app.post("/register", register)

app.use(authentication)

app.post('/uploadImage', upload.single('imageUrl'), uploadImage)

app.get("/room", fetchData)
app.get("/room/:id", fetchId)
app.post("/room", postData)

module.exports = app