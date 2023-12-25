const api = require("express").Router();
const userController = require("../controllers/userController")
// const use = require('../helper/utility').use

api.post("/api/user/login", userController.login);
api.post("/api/user/logup", userController.logup);

api.get("/api/user/getAllUser", userController.getAllUser)
api.get("/api/user/getAllTeacherAndStudent", userController.getAllTeacherAndStudent)
api.get("/api/user/getUserInfor/:id", userController.getAUserInfor)

api.put("/api/user/updatePassword/:id", userController.updatePassword)
api.put("/api/user/updateUser/:id", userController.updateUser)

api.delete("/api/user/deleteUser/:id", userController.deleteUser); 
module.exports = api
