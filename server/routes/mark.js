const express = require('express');
const api = express.Router();
const markController = require('../controllers/markController')
const use = require('../helper/utility').use
const authMiddleware = require('../middleware/authMiddleware')

api.post("/api/mark/:teacherId/:projectId", authMiddleware.protectTeacher, use(markController.addMark))

api.get("/api/mark/:projectId", authMiddleware.protectStudent, use(markController.listMark))

module.exports = api
