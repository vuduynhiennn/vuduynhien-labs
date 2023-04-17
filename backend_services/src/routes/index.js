const userRoutes = require('./user/user.routes')

const routes = (app) => {

   app.use("/user", userRoutes)
}

module.exports = routes