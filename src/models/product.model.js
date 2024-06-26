const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new mongoose.Schema({
    product_name: {
        type:String,
        required: true
    },
    product_thumb: {
        type: String,
        required: true
    },
    product_description: {
        type: String
    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Funiture']
    },
    product_shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    product_attributes:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

const clothingSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    size: String,
    material: String
}, {
    collection: 'clothes',
    timestamps: true
})

const electronicSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true
    },
    model: String,
    color: String
},{
    collection: 'electronics',
    timestamps: true
})

module.exports = {
    product: mongoose.model(DOCUMENT_NAME, productSchema),
    electronic: mongoose.model('Electronics', electronicSchema),
    clothing: mongoose.model('Clothing', clothingSchema)
}