const connectToMySQL = require("../config/connectToMySQL")

const insertToDB = (table, columns, values) => {
    let newValues = [];

    values.map((item, i) => {
        newValues.push(`"${item}"`)
    })
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${newValues})`
    connectToMySQL.query(sql, (err, rows, fields) => {
        if (err) console.log(err)
    })
}

module.exports = insertToDB