const express = require('express');
const api = express.Router();
const projectController = require('../controllers/projectController')
const use = require('../helper/utility').use
const authMiddleware = require('../middleware/authMiddleware')

api.post("/api/project/:userId", authMiddleware.protectStudent, use(projectController.addProject))

api.get('/api/project/:userId', authMiddleware.protectStudent, use(projectController.listProject))

api.get('/api/project/:userId/:projectId', authMiddleware.protectStudent, use(projectController.getProject))

api.put('/api/project/:projectId', authMiddleware.protectStudent, use(projectController.updateProject))

api.delete('/api/project/:projectId', authMiddleware.protectStudent, use(projectController.deleteProject))

api.post('/api/project/uploadfile/:projectId', use(projectController.uploadFile))

module.exports = api
