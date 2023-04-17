const { VLD_username, VLD_email, VLD_password } = require("../../helpers/validate.helper")

/* -- VARIABLES -- */
let systemOTP="hello@ConcacDItMeRandomTextDoanDiDitCOnMeMay" // TEMPORARY FOR REGISTER

let temp_username, temp_email, temp_password // TEMPORARY FOR CONFIRM OTP

let genPassword // TEMPORARY FOR RENEW PASSWORD

let expireTime // TEMPORARY FOR TIME COUNTDOWN
/* --------------- */

const userServices = {
    /* --REGISTER-- */
    register: (req, res) => {
        const { username, email, password } = req.body;
        temp_username = username
        temp_email = email
        temp_password = password

        // validate user input
        if(!VLD_username(username).status || !VLD_email(email).status || !VLD_password(password).status) {
            return res.status(406).json({
                username: VLD_username(username).message,
                email: VLD_email(email).message,
                password: VLD_password(password).message
            })
        }
        
        const is_existed = require("../../helpers/is_existed")
        const hasUserName = is_existed("username", "users", username)
        const hasEmail = is_existed("email", "users", email)

        Promise.all([hasUserName, hasEmail]).then((values) => {
            const newArr = values.slice(",")
            // check in database
            if (newArr[0].length || newArr[1].length) {
                return res.status(406).json({
                    message: "Email hoặc username đã tồn tại trong hệ thống, vui lòng thử cái khác"
                })
            }

            const { genOTP } = require("../../helpers/OTPservices")
            systemOTP = genOTP()

            // sendo OTP to client
            // time 1
            const emailServices = require("../../config/nodemailer");
            emailServices(email, "Vui lòng không trả lời email này", `Hãy nhập đoạn code sau để xác minh email ${systemOTP}`)
            expireTime = Date.now()

            return res.status(200).json({
                status: true,
                message: "Vào email để lấy OTP, nếu không thấy email thì check trong mục thư rác ấy"
            })
        })
    /* ------------ */
    },
    /* --CONFIRM OTP-- */
    confirmOTP: (req, res) => {
        const { userOTP } = req.body
        const { checkOTP } = require("../../helpers/OTPservices");
        if (!checkOTP(systemOTP, userOTP)) {
            return res.status(406).json({
                status: false,
                message: "OTP không đúng"
            })
        }
        if (((Date.now() - expireTime) / 1000) > 300) {
            return res.status(406).json({
                status: false,
                message: "OTP quá hạn rồi ông bà già"
            })
        }
        const crypto = require('crypto');
        const insertToDB = require("../../helpers/insertToDb")
        insertToDB("users", ["id", "username", "email", "password"], [crypto.randomUUID(), temp_username, temp_email, temp_password])

        return res.status(200).json({
            status: true,
            message: "Ok xác minh xong rồi đấy, không tin vào database mà xem"
        })
 
    /* ------------ */
    },
    /* -- FORGET PASSWORD -- */
    forgetPass: (req, res) => { 
        const { email }  = req.body
        const is_existed = require("../../helpers/is_existed.js");
        is_existed("email", "users", email)
        .then((rows) => {
            if (rows.length == 0) return res.status(406).json({
                status: false,
                message: `Email: ${email} chưa được đăng kí`
            })
            const { genOTP } = require("../../helpers/OTPservices")
            systemOTP = genOTP()
            
            const emailServices = require("../../config/nodemailer")
            emailServices(email, "Vui lòng không trả lời email này !", `vào đường link sau <a href="http://${process.env.HOST}:${process.env.PORT}/user/renewPassword?email=${email}&userOTP=${systemOTP}"> Cấp lại mật khẩu </a>`)
            expireTime = Date.now()

            return res.status(200).json({
                status: true,
                message:"Một email chứa link cấp lại mật khẩu đã được gửi vào email của bạn, check xem, nếu không thấy vào mục thư rác mà tìm"
            })
        })
        
    },
    /* -- RENEW PASSWORD -- */
    renewPassword: (req, res) => {
        const { email, userOTP } = req.query
        if (String(systemOTP) !== String(userOTP)) {
            return res.status(406).json({
                status: false,
                message: "Có phải email của bạn đâu mà bạn đòi lấy lại mật khẩu."
            })
        }

        if ((Date.now() - expireTime) / 1000 > 300) {
            return res.status(400).json({
                status: false,
                message: "Hết hạn rồi ông bà già, ấn lại cái nút quên mật khẩu đi"
            })
        }

        const { genOTP } = require("../../helpers/OTPservices")
        genPassword = genOTP()

        const updateTableOneColumn = require("../../helpers/updateTableOneColumn")
        updateTableOneColumn("users", "password", genPassword, "email", email)
        .then((rows) => {
            return res.status(200).json({
                status: true,
                message: `Mật khẩu mới của bạn là: ${genPassword}`
            })
        })

    /* ----------- */
    },
    /* -- LOGIN -- */
    login: (req, res) => {
        const { email, password } = req.body
        
    }
}

module.exports = userServices