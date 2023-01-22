const {StatusCodes} = require('http-status-codes')

const CustomAPIError = require('./custom_api_error')

class Unauthenticated extends CustomAPIError 
{
    constructor(message){
        super(message)

        this.StatusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthenticated