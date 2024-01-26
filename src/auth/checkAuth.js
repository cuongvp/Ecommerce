const { findById } = require("../services/apikey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}


const apiKey = async (req, res, next) => {

    try{
        const key = req.headers[HEADER.API_KEY]?.toString()
        
        if(!key){
            return res.status(403).json({
                message: 'Forbidden Error: Must Have API Key'
            })
        }
        // check objKey
        const objKey = await findById(key)
      
        if(!objKey){
            return res.status(403).json({
                message: 'Forbidden Error: Invalid API Key'
            })
        }
    
        req.objKey = objKey
        return next()
    }
    catch(err){
        return res.status(400).json({
            error: err.message
        })
    }
}

const permission = (permission) => {
    return (req, res, next) => {

        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Permission Forbidden: Do not have permission'
            })
        }

        const validPermission = req.objKey.permissions.includes(permission)
        if(!validPermission){
            return res.status(403).json({
                message: 'Permission denied'
            })
        }

        return next()
    }
}

module.exports = {
    apiKey,
    permission
}