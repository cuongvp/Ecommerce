const productService = require('../services/product.service')
const {OK, CREATED, SuccessResponse} = require('../core/success.response')

class ProductController{
    createNewProduct = async(req, res, next) => {
        return new SuccessResponse({
            message: 'Create new product successfully!',
            metadata: await productService.createProduct(req.body.product_type, req.body)
        }).send(res)
    }
}

module.exports = new ProductController()