

// Use an immediately-invoked function expression (IIFE) to call the uploadFile function
// (async () => {
//     // Call the uploadFile function with the specified parameters
//     const ret = await uploadFile(process.env.BUCKET_NAME, 'test.txt', 'outputTest.txt');

//     // Log the result of the upload operation to the console
//     console.log(ret);
// })();

// controllers/fileController.js
const uploadModel = require('../models/Upload');

class UploadController {
  async uploadFile(req, res) {
    try {
        const projectId = req.params.projectId
        const file = req.file;
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
