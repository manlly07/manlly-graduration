const userModel = require('../models/User')


exports.isStudent = async (req, res, next) => {
    try{
        const userId = req.user._id
        // const user = await 
    }catch(err){
        console.log(err);
    }
}