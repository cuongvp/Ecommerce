const {product, clothing, electronic} = require('../models/product.model')

class productFactory{
    static async createProduct(type, payload){
        switch(type){
            case 'Electronics':
                return new Electronic(payload).createProduct()
            case 'Clothing':
                return new Clothing(payload).createProduct()
            default:
                return new Error(`Invalid Product Type ${type}`)
        }
    }
}

class Product{
    constructor({
        product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes
    }){
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createProduct(){
        return await product.create(this)
    }
}

class Clothing extends Product{
    async createProduct(){
        const newClothing = await clothing.create(this.product_attributes)
        if(!newClothing){
            throw new Error('Create new clothing error')
        }

        const newProduct = await super.createProduct()
        if(!newProduct){
            throw new Error('Create new product error')
        }

        return newProduct
    }
}

class Electronic extends Product{
    async createProduct(){
        const newElect = await electronic.create(this.product_attributes)
        if(!newElect){
            throw new Error('Create new electronic error')
        }

        const newProduct = await super.createProduct()
        if(!newProduct){
            throw new Error('Create new electronic error')
        }

        return newProduct
    }
}

module.exports = productFactory