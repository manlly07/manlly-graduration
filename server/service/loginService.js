<<<<<<< HEAD
import bcrypt from "bcryptjs";
=======
const bcrypt = require('bcryptjs')
>>>>>>> duc
let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: uname }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {};
            let checkEmailExist = await checkEmail(email);
            if(checkEmailExist) {
                let user = await db.User.findOne({
                    attributes: ["id", "email", "password", "name", "phoneNumber", "DOB", "address", "role"],
                    where: { username: username },
                    raw: true
                });
                if(user) {
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if( checkPassword) {
                        result.data = user;
                        result.statusCode = 0;
                        result.message = "Đăng nhập thành công";
                    } else {
                        result.statusCode = 1;
                        result.message = "Sai mật khẩu";
                    }
                }
            } else {
                result.statusCode = 2;
                result.message = "Email không tồn tại";
            }
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleLogin: handleLogin,
}