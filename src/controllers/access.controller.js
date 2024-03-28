const AccessService = require("../services/access.service")
const {OK, CREATED, SuccessResponse} = require('../core/success.response')

class AccessController {

    handleRefreshToken = async (req, res, next) => {
        return new SuccessResponse({
            message: 'Get Token Success!',
            metadata: await AccessService.handleRefreshToken(req.body.refreshToken)
        }).send(res)
    }

    logout = async (req, res, next) => {
        console.log('hhhhhhh')
        return new SuccessResponse({
            message: 'Logout success!',
            metadata: await AccessService.logout({ keyStore: req.keyStore })
        }).send(res)
    }

    login = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {
       
        try{
            const result = await AccessService.signUp(req.body)

            new CREATED({
                message: 'Registered OK!',
                metadata: result
            }).send(res)
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = new AccessController()