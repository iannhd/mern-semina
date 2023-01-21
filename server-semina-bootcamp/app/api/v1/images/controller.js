const {StatusCodes} = require('http-status-codes')
const {createImage} = require( '../../../services/mongoose/image')

const create = async (req, res, next) => {

    try {
        console.log(req.file, "===> req.file")

        const result = await createImage(req)
        res.status(StatusCodes.CREATED).json({
            data:result
        })
    } catch (error) {
        next(error)
    }

}


module.exports = {create}