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
    const projects = await Project.find({userId: userId})
    if (projectId){
        const project = projects.filter((item) => item._id === projectId)
        return project
    }
    return projects
}

exports.update = async function(projecyId,data){
    const result = await Project.findByIdAndUpdate(projecyId, data, (err, docs) => {
        if(err) {
            console.log("Error in updating data")
            throw err;
        } else{
            console.log(docs);
        }
    })
    return result
}

exports.delete = async function(projectId){
    const result =  await Project.remove({ _id : projectId }, (err)=>{
        if(err) {
            console.log("Error in deleting data");
            throw err;
        }else{
            console.log('Successfully');
        }
    })
    return result
}

