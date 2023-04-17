const connectToMySQL = require("../config/connectToMySQL")

const updateTableOneColumn = (table, column_name, value, condition_column, condiction_value) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE ${table} SET ${column_name} = "${value}" WHERE ${condition_column}="${condiction_value}"`
        console.log(sql)
        connectToMySQL.query(sql, (err, result, fields) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

module.exports = updateTableOneColumn