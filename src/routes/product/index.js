const express = require('express')
const ProductController = require('../../controllers/product.controller')

const router = express.Router()

router.post('/createProduct', ProductController.createNewProduct)

module.exports = router