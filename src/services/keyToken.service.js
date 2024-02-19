const keytokenModel = require("../models/keytoken.model")
const { Types } = require('mongoose')

class KeyTokenService{

    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    
        try {
            // level 0
            // const publicKeyString = publicKey.toString()
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey: publicKeyString
            // })
            
            // return tokens ? tokens.publicKey : null

            // level xxx
            const filter = { user: userId }
            const update = { privateKey, publicKey, refreshTokensUsed: [], refreshToken }
            const options = { upsert: true, new: true }

            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

            console.log(tokens)

            return tokens ? tokens.publicKey : null

        } catch (error) {
            console.error('Cannot create key token! ' + error.message)
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId)}).lean()
    }

    static removeKeyById = async (id) => {
        return await keytokenModel.deleteOne(id)
    }

}

module.exports = KeyTokenService