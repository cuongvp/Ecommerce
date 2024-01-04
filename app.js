const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

// init middlewares
app.use(morgan())
app.use(helmet())
app.use(compression())
// init db

// init routes
app.get('/', (req, res, next) => {
    res.send({
        message: "Welcome"
    })
})
// handling error

module.exports = app