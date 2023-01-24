const {StatusCodes} = require('http-status-codes')

const {
    createOrganizer,
    createUsers,
    getAllUser
} = require('../../../services/mongoose/user')


const getCMSuser = async (req, res, next) => {
    try {
        const result = await getAllUser(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const createCMSorganizer = async (req, res, next) => {
    try {

        const result = await createOrganizer(req)
        res.status(StatusCodes.CREATED).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const createCMSoUser = async (req, res, next) => {
    try {

        const result = await createUsers(req)
        res.status(StatusCodes.CREATED).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    createCMSorganizer,
    createCMSoUser,
    getCMSuser
}