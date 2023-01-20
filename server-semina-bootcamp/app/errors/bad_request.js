const {StatusCodes} = require('http-status-codes')

const CustomAPIError = require('./custom_api_error')

class BadRequest extends CustomAPIError 
{
    constructor(message){
        super(message)

        this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest