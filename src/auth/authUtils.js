const jwt = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')

// service
const { findByUserId } = require('../services/keyToken.service')
const { AuthFailureError, NotFoundError } = require('../core/error.response')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}


const createTokenPair = async (payload, publicKey, privateKey) => {
    
    try{
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await jwt.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if(err){
                console.error(`error verify:: ${err}`)
            }else{
                console.log(`decode verify:: ${decode}`)
            }
        })

        return { accessToken, refreshToken }

    }catch(error){
        console.log(`Error when create token: ${error}`)
        return {
            code: 'createTokenPair',
            error: error.message
        }
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    /*
    1) check userId missing
    2) get access token
    3) verify token
    4) check user in dbs
    5) check keyStore with this userId
    6) Ok all => return next()
    */

    // 1
    const userId = req.headers[HEADER.CLIENT_ID]

    if(!userId){
        throw new AuthFailureError('Invalid Request')
    }
    // 2
    const keyStore = await findByUserId(userId)

    if(!keyStore){
        throw new NotFoundError('Not Found KeyStore')
    }

    // 3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken){
        throw new AuthFailureError('Invalid Request')
    }


    try{
        const decoder = jwt.verify(accessToken, keyStore.publicKey)

        if(userId != decoder.userId){
            throw new AuthFailureError('Invalid User')
        }

        req.keyStore = keyStore

        return next()

    }catch(err){
        throw err
    }


})

const verifyJWT = async (token, keySecret) => {
    return await jwt.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}