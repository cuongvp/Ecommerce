const express = require('express')
const accessController = require('../../controllers/access.controller')
const errorHandler = require('../../core/errorHandler')
const router = express.Router()

router.post('/shop/signup', accessController.signUp)

router.all('*', (req, res, next) => {
    
    const err = new Error(`Can not find ${req.originalUrl} on the server!`)
    err.status = 404

    next(err)
})

router.use(errorHandler)

module.exports = router