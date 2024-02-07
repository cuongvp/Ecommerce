
const errorHandler = (error, req, res, next) => {

    const statusCode = error.status ? error.status : 500
  
    res.json({
        statusCode,
        message: error.message
    })
}

module.exports = errorHandler