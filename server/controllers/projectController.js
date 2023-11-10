const projectModel = require('../models/Project')
const utility = require('../helper/utility')

exports.addProject = async function(req, res){
    const data = req.body
    utility.validate(data, ['projectName', 'description'])
    const userId = req.params.userId

    const checkQuantity = await projectModel.get(userId)
    if (checkQuantity.length === 2) {
        return res.status(404).json({message: 'bad request'})
    }

    const newProject = await projectModel.create(userId, data)
    if(!newProject){
        return res.status(500).json({message: 'error'})
    }    
    return res.status(200).json(newProject)
}

exports.listProject = async function(req, res){
    const userId = req.params.userId
    const projects = await projectModel.get(userId)
    if(!projects){
        return res.status(401).json({message: "not found"})
    }
    return res.status(200).json(projects)

}

exports.getProject = async function(req, res){
    const userId = req.params.userId
    const projectId = req.params.projectId

    const project = await projectModel.get(userId, projectId)
    if(!project){
        return res.status(404).json({message: "not found"})
    }
    return res.status(200).json(project)
}