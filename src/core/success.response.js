const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    CREATED: 'Created',
    OK: 'Success'
}

class SuccessResponse {
    constructor({message, statuscode = StatusCode.OK, reasonStatus = ReasonStatusCode.OK, metadata = {}, options = {}}){
        this.message = message ? message : reasonStatus
        this.status = statuscode
        this.metadata = metadata
        this.options = options
    }

    send(res, headers = {}){
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse{
    constructor({message, metadata}){
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse {
    // constructor({message, metadata, options}){
    //     super({message, metadata, options})
    //     this.status = StatusCode.CREATED
    //     this.reasonStatus = ReasonStatusCode.CREATED
    // }

    constructor({message, statuscode = StatusCode.CREATED, reasonStatus = ReasonStatusCode.CREATED, metadata = {}, options = {}}){
        super({message, metadata, statuscode, reasonStatus, options})
    }
}

module.exports = {
    OK,
    CREATED
}