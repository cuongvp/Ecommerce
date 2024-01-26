
const apikeyModel = require('../models/apikey.model')

const findById = async (key) => {
    
    try{
        const result = await apikeyModel.findOne({key, status: true}).lean()
        return result
    }
    catch(err){
        return {
            error: err.message
        }
    }
}

module.exports = {
    findById
}