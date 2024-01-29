const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')

const app = express()

// init middlewares
app.use(morgan())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true 
}))

// init db
require('./src/dbs/init.mongodb')

// init routes
app.use('', require('./src/routes/index'))
// handling error


module.exports = app