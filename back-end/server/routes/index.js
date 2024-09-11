const express = require('express')
const { login, register } = require('../controller/userController')
const authentication = require('../middleware/authentication')
const app = express()

app.post("/login", login)
app.post("/register", register)

app.use(authentication)


module.exports = app