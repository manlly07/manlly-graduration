const csv = require('csv-parser')
const fs = require('fs')
const uploadModel = require('../models/Upload');
const stream = require('stream');
const userController = require("../controllers/userController")

function validateUserData(data) {
  return data.map((entry) => {
    const requiredFields = ['name', 'phoneNumber', 'DOB', 'address', 'Department', 'Majors', 'role'];
    for (const field of requiredFields) {
      if (!entry[field]) {
        throw new Error(`Field '${field}' is required for each entry`);
      }
    }
    return entry;
  });
}

function processUserData(data) {
  return data.map((entry) => {
    entry = convertKeysToLowercase(entry);
    entry.email = entry.email.toLowerCase();
    entry.role = convertRoleToNumber(entry.role);

    const cleanedName = entry.name.replace(/\s/g, '');
    entry.password = `${cleanedName}_${entry.phoneNumber}`;

    return entry;
  });
}

function convertKeysToLowercase(obj) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      result[key.toLowerCase()] = obj[key];
    } else {
      result[key] = obj[key];
    }
  } 
  return result;
}

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

  async deleteFilesByProjectId(req, res) {
    try {
      const projectId = req.params.projectId;
      const result = await uploadModel.deleteFilesByProjectId(projectId)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async uploadUser(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = [];
      const fileBuffer = req.file.buffer;
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);

      bufferStream
        .pipe(csv({}))
        .on('data', (data) => {
          console.log(data, data['email'])
          data.email = data['email'];
          result.push(data);
        })
        .on('end', async () => {
          try {
            console.log(result)
            const validatedData = validateUserData(result);
            const processedData = processUserData(validatedData);
            console.log(processedData)
            // for (const entry of processedData) {
            //   await userController.logup({ body: entry }, {});
            // }
            res.status(200).json({ status: 0, data: processedData });
          } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
          }
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UploadController();
