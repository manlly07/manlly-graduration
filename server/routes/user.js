const express = require('express');
const api = express.Router();
const userController = require("../controllers/userController")

api.post("/api/user/login", use(userController.login))

module.exports = api
