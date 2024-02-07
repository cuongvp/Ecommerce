const AccessService = require("../services/access.service")
const {OK, CREATED} = require('../core/success.response')

class AccessController {

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