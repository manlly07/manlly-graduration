const app = require("express").Router();
const userController = require("../controllers/userController")

app.post("/login", userController.login);
module.exports = app