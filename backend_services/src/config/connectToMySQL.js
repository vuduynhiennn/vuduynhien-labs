require("dotenv").config()

const mysql2 = require("mysql2")

const connectToMySQL = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connectToMySQL.connect((err) => {
    if (err) throw err
    console.log("connected to MYSQL")
})

module.exports = connectToMySQL