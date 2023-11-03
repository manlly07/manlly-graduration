const app = require("express").Router();
const userController = require("../controller/userController")

app.post("/login", userController.login);
module.exports = app