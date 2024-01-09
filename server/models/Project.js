const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    projectName: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description: {type: String, required: true},
    listMark: [{type: mongoose.Schema.Types.ObjectId, ref: 'Mark'}],
    date_created: Date
})

const Project = mongoose.model('Project', ProjectSchema, 'projects')
exports.schema = Project

exports.create = async function(userId, project){
    const data = { 
        projectName: project.projectName,
        userId: userId,
        description: project.description,
        date_created: new Date()
    }
    const newProject = Project(data)
    await newProject.save()
    return newProject
}

exports.get = async function(userId, projectId){
    debugger
    const projects = await Project.find({userId: userId})
    if (projectId){
        const project = projects.filter((item) => item._id == projectId)
        return project
    }
    return projects
}

exports.update = async function(projecyId,data){
    try{
        const project = await Project.findByIdAndUpdate(projecyId, data)
        const result = await Project.findById(project._id)
        return result
    }catch(err){
        return err
    }
}

exports.delete = async function(projectId){ 
    try{
        const result = await Project.findByIdAndDelete(projectId)
        return result
    }catch(err){
        return err
    }
}

exports.addMark = async function(projectId, markId){
    try{
        debugger
        const project = await Project.findById(projectId)
        project.listMark.push(markId)
        project.markModified('listMark')
        await project.save()
        return project
    }catch(err){
        return err
    }
}

exports.listMark = async function(projectId){
    try{
        debugger
        const project = await Project.findById(projectId).populate('listMark')
        const marks = project.listMark
        return marks
    }catch(err){
        return err
    }
}


