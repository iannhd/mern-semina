const {StatusCodes} = require('http-status-codes')
const errorMiddlewares = (err, req, res, next) => {
    
    let customError = {
        // set default
        statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something wrong, try again later'
    }

    if(err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(', ')
        customError.statusCode = 400
    }

    if(err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }

    if(err.name === 'CastError'){
        customError.msg = `No item found wiht id : ${err.value}`
        customError.statusCode = 404
    }

    return res.status(customError.statusCode).json({
        msg: customError.msg
    })
}

module.exports = errorMiddlewares