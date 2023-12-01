const markModel = require('../models/Mark')
const projectModel = require('../models/Project')
const utility = require('../helper/utility')

exports.addMark = async function(req, res){
    try{
        debugger
        const data = req.body
        utility.validate(data, ['mark'])
        const teacherId = req.params.teacherId
        const projectId = req.params.projectId

        const marks = await projectModel.listMark(projectId)
        if(marks.length === 5){
            return res.status(403).json({message: 'Maximum Marks Reached'})
        }
        if(data.type === 0 || data.type === 1){
            const checkMark = marks.filter(item => item.type === data.type)
            if(checkMark.length >= 1){
                return res.status(422).json({message: 'This mark existed'})
            }
        }

        const newMark = await markModel.create(teacherId, data)
        if(!newMark){
            return res.status(500).json({message: 'error'})
        }else{
            const updatedProject = await projectModel.addMark(projectId, newMark._id)
            return res.status(200).json(updatedProject)
        }

    }catch(e){
        return res.status(500).json({message: e})
    }
}

exports.listMark = async function(req, res){
    try{
        debugger
        const projectId = req.params.projectId
        const marks = await projectModel.listMark(projectId)
        return res.status(200).json(marks)
    }catch(e){
        return res.status(500).json({message: e})
    }
}

exports.updateProject = async function(req, res){
    const markId = req.params.markId
    const data = req.body
    try{
        const result = await markModel.update(markId, data)
        return res.status(200).json(result)
    }catch(err){
        return res.status(404).json({msg: 'error', data: err})
    }
}