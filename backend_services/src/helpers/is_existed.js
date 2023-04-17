const connectToMySQL = require("../config/connectToMySQL")

const is_existed = (column, table, value) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${table} WHERE ${column} = "${value}"`
        connectToMySQL.query(sql, (err, rows, fields) => {
            if (err) return reject(err)
            // connectToMySQL.end()
            resolve(rows)
        })  
    })
}

module.exports = is_existed