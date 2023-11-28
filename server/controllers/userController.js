const User = require("../models/User");
const cryptoJS = require("crypto-js");
const loginService = require("../service/loginService");
const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;

            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: "Không được để trống"
                });
            } else {
                console.log(req.body)
                let result = await loginService.handleLogin(email, password);
                if (result.statusCode == 0) {
                    return res.status(200).json({
                        statusCode: result.statusCode,
                        message: result.message,
                        userData: result.data
                    });
                } else {
                    return res.status(404).json({
                        statusCode: result.statusCode,
                        message: result.message,
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },

    logup: async (req, res) => {
        try {
            let {
                email,
                password,
                name,
                phoneNumber,
                DOB,
                address,
                department,
                majors,
                role
            } = req.body;

            if (!email || !password || !name) {
                return res.status(400).json({
                    status: false,
                    message: "Vui lòng cung cấp email, password và tên"
                });
            }

            let existingUser = await User.findOne({
                email: email
            });
            if (existingUser) {
                return res.status(409).json({
                    status: false,
                    message: "Email đã được sử dụng"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            const newUser = new User({
                email,
                password: hashedPassword,
                name,
                phoneNumber,
                DOB,
                address,
                Department: department,
                Majors: majors,
                role,
                date_created: new Date()
            });

            const savedUser = await newUser.save();
            return res.status(200).json({
                status: true,
                message: "Đăng ký thành công"
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            let userId = req.params.id;
            let updatedUser = req.body;

            await User.findByIdAndUpdate(userId, updatedUser);

            return res.status(200).json({
                status: true,
                message: "Cập nhật thông tin người dùng thành công"
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            let userId = req.params.id;

            await User.findByIdAndDelete(userId);

            return res.status(200).json({
                status: true,
                message: "Xóa người dùng thành công"
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },

    getAUserInfor: async (req, res) => {
        try {
            let userId = req.params.id;

            let user = await User.findById(userId);

            return res.status(200).json({
                status: true,
                userData: user
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },

    getAllUser: async (req, res) => {
        try {
            let users = await User.find();

            return res.status(200).json({
                status: true,
                userData: users
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    },
};
