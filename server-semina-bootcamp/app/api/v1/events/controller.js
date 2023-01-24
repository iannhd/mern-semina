const {StatusCodes} = require('http-status-codes')

const {
    getAllEvents,
    getOneEvents,
    createEvents,
    updateEvents,
    deleteEvents,
    changeStatusEvents
} = require('../../../services/mongoose/event')




const create = async (req, res, next) => {
    try {

        const result = await createEvents(req)
        res.status(StatusCodes.CREATED).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllEvents(req)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneEvents(req)
        res.status(StatusCodes.OK).json({
            data:result
        })
    
    } catch (error) {
        next(error.message)
    }
}

const update = async (req, res, next) => {
    try {

        const result = await updateEvents (req)

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

    const result = await deleteEvents(req)
    res.status(StatusCodes.OK).json({
        data: result
    })
   } catch (error) {
        next(error)
   }

}

const changeStatus = async (req, res, next) => {
    try {
        const result = await changeStatusEvents(req)

        res.status(StatusCodes.OK).json({
            data:result
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
    changeStatus
}