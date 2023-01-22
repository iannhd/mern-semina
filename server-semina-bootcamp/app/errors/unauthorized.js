const {StatusCodes} = require('http-status-codes')

const CustomAPIError = require('./custom_api_error')

class Unauthorized extends CustomAPIError 
{
    constructor(message){
        super(message)

        this.StatusCodes = StatusCodes.FORBIDDEN
    }
}

module.exports = Unauthorized