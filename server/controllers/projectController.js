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

exports.updateProject = async function(req, res){
    const projectId = req.params.projectId
    const data = req.body
    try{
        const result = await projectModel.update(projectId, data)
        return res.status(200).json(result)
    }catch(err){
        return res.status(404).json({msg: 'error', data: err})
    }
}

exports.deleteProject = async function(req, res){
    const projectId = req.params.projectId
    try{
        const result = await projectModel.delete(projectId)
        if(result === null){
        return res.status(404).json({msg: 'error', data: result})
        }
        return res.status(200).json({msg: 'success', data: result})
    }catch(err){
        return res.status(404).json({msg: 'error', data: err})
    }
}


// exports.uploadFile = async function(req, res){
//     const projectId = req.params.projectId
//     const data = req.body
//     debugger
//     try{    
//         const url = new URL(data.fileURL);
//         const fileName = url.pathname.split('/').pop(); // Lấy phần cuối cùng sau khi tách theo dấu '/'
//         const [name, extension] = fileName.split('.'); // Tách tên và định dạng theo dấu '.'    
//         let newFileName = `${name}_${Date.now()}_${projectId}.${extension}`;

//         const outPutFile = await projectModel.uploadFile(process.env.BUCKET_NAME, '../uploads/test.txt', newFileName);
//         return res.json(outPutFile)
//     }catch(err){
//         return res.status(404).json({msg: 'error', data: err})
//     }
// }