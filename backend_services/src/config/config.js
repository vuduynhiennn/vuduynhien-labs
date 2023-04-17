const bodyParser = require('body-parser')
const morgan = require("morgan")

const config = (app) => {
    app.use(bodyParser.json())
    app.use(morgan('combined'))
}

module.exports = config