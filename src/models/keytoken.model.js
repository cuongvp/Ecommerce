const { Schema, model } = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'Keys'
const DOCUMENT_NAME = 'Key'

var keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        required: true
    },
    refreshToken: {
        type: Array,
        default: []
    }
   
},  {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME , keyTokenSchema);