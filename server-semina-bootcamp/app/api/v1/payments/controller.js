const {StatusCodes} = require('http-status-codes')

const {
    getAllPayment,
    getOnePayments,
    createPayments,
    updatePayments,
    deletePayments,
} = require('../../../services/mongoose/payment')




const create = async (req, res, next) => {
    try {

        const result = await createPayments(req)
        res.status(StatusCodes.CREATED).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllPayment(req)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOnePayments(req)
        res.status(StatusCodes.OK).json({
            data:result
        })
    
    } catch (error) {
        next(error.message)
    }
}

const update = async (req, res, next) => {
    try {

        const result = await updatePayments (req)

        res.status(StatusCodes.OK).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
   try {
    const { id } = req.params

    const result = await deletePayments(req)
    res.status(StatusCodes.OK).json({
        data: result
    })
   } catch (error) {
        next(error)
   }

}



module.exports = {
    create,
    index,
    find,
    update,
    destroy,
}