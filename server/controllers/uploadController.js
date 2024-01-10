
const uploadModel = require('../models/Upload');

class UploadController {
  async uploadFile(req, res) {
    try {
      debugger
      console.log(req.params.projectId, req?.body?.file)
        const projectId = req.params.projectId
        const file = req.body?.file; 
        const result = await uploadModel.uploadFile(file, projectId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
 
  async getFilesByProjectId(req, res) {
    try {
      const projectId = req.params.projectId;
      const fileList = await uploadModel.getFilesByProjectId(projectId);
      res.status(200).json(fileList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UploadController();
