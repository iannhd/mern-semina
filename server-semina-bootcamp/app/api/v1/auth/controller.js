const {StatusCodes} = require('http-status-codes')
const {signin} = require( '../../../services/mongoose/auth')

const signInCms = async (req, res, next) => {

    try {
        
        const result = await signin(req)

        res.status(StatusCodes.CREATED).json({
            data:{token: result}
        })
    } catch (error) {
        next(error)
    }

}


module.exports = {signInCms}