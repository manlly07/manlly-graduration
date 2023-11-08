const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    projectName: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description: {type: String, required: true},
    listMark: [{type: mongoose.Schema.Types.ObjectId, ref: 'Mark'}]
})

const Project = mongoose.model('Project', ProjectSchema, 'projects')
exports.schema = Project

