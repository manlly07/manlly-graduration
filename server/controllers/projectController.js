const projectModel = require('../models/Project')
const utility = require('../helper/utility')

exports.addProject = async function(req, res){
    const data = req.body
    utility.validate(data, ['projectName', 'description'])
    const userId = req.params.userId

    const newProject = await projectModel.create(userId, data)
    if(!newProject){
        return res.status(500).json({message: 'eroor'})
    }    
    return res.status(200).json(newProject)
}