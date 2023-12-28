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


const { Storage } = require('@google-cloud/storage');

const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;
const bucketName = process.env.BUCKET_NAME

// Create a new Storage object with the specified project ID and key file
const storage = new Storage({ projectId, keyFilename });

class FileModel {
    async uploadFile(file) {
      const bucket = storage.bucket(bucketName);
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);
  
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
  
      stream.on('error', (err) => {
        throw new Error(err);
      });
  
      stream.on('finish', () => {
        // File uploaded successfully.
      });
  
      stream.end(file.buffer);
  
      return {
        fileName,
        fileUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`,
      };
    }
  }
  
  module.exports = new FileModel();

// Define an asynchronous function to upload a file to Google Cloud Storage
// exports.uploadFile = async function(bucketName, file, fileOutputName) {
//     debugger
//     try {
//         // Get a reference to the specified bucket
//         const bucket = storage.bucket(bucketName);

        
//         // Upload the specified file to the bucket with the given destination name
//         const ret = await bucket.upload(file, {
//             destination: fileOutputName
//         });

//         // Return the result of the upload operation
//         return ret;
//     } catch (error) {
//         // Handle any errors that occur during the upload process
//         return error
//     }
// }
