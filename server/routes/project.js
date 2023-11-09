const express = require('express');
const api = express.Router();
const projectController = require('../controllers/projectController')
const use = require('../helper/utility').use

api.post("/api/project/:userId", use(projectController.addProject))

module.exports = api
