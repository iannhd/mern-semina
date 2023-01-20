const {StatusCodes} = require('http-status-codes')

const CustomAPIError = require('./custom_api_error')

class NotFound extends CustomAPIError 
{
    constructor(message){
        super(message)

        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound