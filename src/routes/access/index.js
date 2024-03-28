const express = require('express')
const accessController = require('../../controllers/access.controller')
const errorHandler = require('../../core/errorHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.post('/shop/signup', accessController.signUp)

router.post('/shop/login', accessController.login)

// authentication //
router.use(authentication)
//
router.post('/shop/logout', accessController.logout)
router.post('/shop/handleRefreshToken', accessController.handleRefreshToken)

router.all('*', (req, res, next) => {
    
    const err = new Error(`Can not find ${req.originalUrl} on the server!`)
    err.status = 404

    next(err)
})

router.use(errorHandler)

module.exports = router