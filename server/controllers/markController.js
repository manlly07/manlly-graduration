const markModel = require('../models/Mark')
const projectModel = require('../models/Project')
const utility = require('../helper/utility')

exports.addMark = async function(req, res){
    try{
        const data = req.body
        utility.validate(data, ['mark', 'type'])
        const teacherId = req.params.teacherId
        const projectId = req.params.projectId

        const newMark = markModel.create(teacherId, data)
        if(!newMark){
            return res.status(500).json({message: 'error'})
        }else{
            const updatedProject = projectModel.addMark(projectId, newMark._id)
            return res.status(200).json(updatedProject)
        }

    }catch(e){
        return res.status(500).json({message: e})
    }
}