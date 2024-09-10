const express = require('express')
const { login, register } = require('../controller/userController')
const app = express()

app.post("/login", login)
app.post("/register", register)

module.exports = app