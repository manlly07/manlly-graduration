const express = require('express');
const api = express.Router();
const userController = require("../controllers/userController")
const use = require('../helper/utility').use

api.post("/api/user/login", use(userController.login))

module.exports = api
