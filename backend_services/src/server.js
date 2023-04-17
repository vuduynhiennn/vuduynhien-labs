const express = require("express");
const app = express();
require("dotenv").config()

// config server
require("./config/config")(app)

// routes
require("./routes")(app)

app.listen(process.env.PORT || 8404, () => {
    console.log(`http://localhost:${process.env.PORT} is running`)
})