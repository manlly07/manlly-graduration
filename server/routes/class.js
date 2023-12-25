const express = require('express');
const api = express.Router();
const classController = require('../controllers/classController')
const use = require('../helper/utility').use
const authMiddleware = require('../middleware/authMiddleware')

api.post("/api/class", use(classController.create))

api.put("/api/class/:classId", use(classController.addUser))

api.get("/api/class/:classId", use(classController.listUser))

api.get("/api/class", use(classController.getAllClass))

module.exports = api
