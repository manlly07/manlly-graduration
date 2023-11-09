const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // const dbConfig = process.env.MONGO_URL;
    const dbConfig = 'mongodb+srv://jeikai:phucdepzai123@cluster0.z8uyvbi.mongodb.net/projectGraduation?retryWrites=true&w=majority'
    const connect = await mongoose.connect(dbConfig);
    console.log(`Mongodb connected: ${connect.connection.host}`);
  } catch (e) {
    console.log('Error connect to mongodb');
  }
};

module.exports = connectDB;
