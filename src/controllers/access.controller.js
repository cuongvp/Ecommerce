const AccessService = require("../services/access.service")
const {OK, CREATED, SuccessResponse} = require('../core/success.response')

class AccessController {

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