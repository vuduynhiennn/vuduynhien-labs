// init routing
const userRoutes = require("express").Router()
// controllers
const userControllers = require("../../controllers/user/user.controllers")

/*------------------------ROUTING AREA---------------------------*/
userRoutes.post("/register", userControllers.register)
userRoutes.post("/confirmOTP", userControllers.confirmOTP)
userRoutes.post("/forgetPASS", userControllers.forgetPASS)
userRoutes.get("/renewPassword", userControllers.renewPassword)

/*---------------------------------------------------------------*/
module.exports = userRoutes
