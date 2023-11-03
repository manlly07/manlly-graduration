const User = require("../models/User");
const cryptoJS = require("crypto-js");
const loginService = require("../service/loginService");
module.exports = {
    login: async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        if( !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Không được để trống"
            })
        } else {
            let result = await loginService.handleLogin(email, password);
            if(result.statusCode == 0) {
                return res.status(200).json({
                    statusCode: result.statusCode,
                    message: result.message,
                    userData: result.data
                })
            } else {
                return res.status(404).json({
                    statusCode: result.statusCode,
                    message: result.message,
                })
            }
        }
    }
}
