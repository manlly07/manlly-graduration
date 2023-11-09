const User = require('../models/User')
const cryptoJS = require("crypto-js");
const loginService = require("../service/loginService");
module.exports = {
    login: async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Không được để trống"
            })
        } else {
            let result = await loginService.handleLogin(email, password);
            if (result.statusCode == 0) {
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
    },
    logup: async (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let name = req.body.name;
            let phoneNumber = req.body.phoneNumber;
            let DOB = req.body.DOB;
            let address = req.body.address;
            let role = req.body.role;

            if (!email || !password || !name) {
                return res.status(400).json({
                    status: false,
                    message: "Vui lòng cung cấp email, password và tên"
                });
            }
            // Kiểm tra xem email đã tồn tại trong database chưa
            let existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({
                    status: false,
                    message: "Email đã được sử dụng"
                });
            }

            // Tạo mới người dùng
            let newUser = new User({
                email: email,
                password: password,
                name: name,
                phoneNumber: phoneNumber,
                DOB: DOB,
                address: address,
                role: role,
                date_created: new Date()
            });

            // Lưu người dùng vào database
            await newUser.save();

            return res.status(201).json({
                status: true,
                message: "Đăng ký thành công"
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Đã xảy ra lỗi"
            });
        }
    }
};
