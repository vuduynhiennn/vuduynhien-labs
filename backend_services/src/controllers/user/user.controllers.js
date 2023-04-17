
const userServices = require("../../services/user/user.services")

const userControllers =  {
    register: userServices.register,
    confirmOTP: userServices.confirmOTP,
    forgetPASS: userServices.forgetPass,
    renewPassword: userServices.renewPassword
}

module.exports = userControllers