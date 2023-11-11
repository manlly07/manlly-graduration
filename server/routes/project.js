const express = require('express');
const api = express.Router();
const projectController = require('../controllers/projectController')
const use = require('../helper/utility').use

api.post("/api/project/:userId", use(projectController.addProject))

api.get('/api/project/:userId', use(projectController.listProject))

api.get('/api/project/:userId/:projectId', use(projectController.getProject))

api.put('/api/project/:projectId', use(projectController.updateProject))

api.delete('/api/project/:projectId', use(projectController.deleteProject))


module.exports = api
