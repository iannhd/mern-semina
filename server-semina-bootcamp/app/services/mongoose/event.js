// import model Events
const Events = require('../../api/v1/events/model')
const { checkImage } = require('./image')
const { checkingCategories } = require('./categories')
const { checkingTalents } = require('./talents')

// import custom error
const {NotFoundError, BadRequest} = require('../../errors')

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query
    let condition = {}

    if( keyword ) {
        condition = {...condition, title: { $regex: keyword, $options: 'i'} }
    }

    if( category ) {
        condition = { ...condition, category: category}
    }
    
    if( talent ) {
        condition = { ...condition, talent: talent}
    }

    const result = await Events.find(condition)
    .populate({
        path: 'image',
        select: ' _id name'
    })
    .populate({
        path: 'category',
        select: '_id name'
    })
    .populate({
        path: 'talent',
        select: '_id name'
    })

    return result
    
}

const createEvents = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    } = req.body

    await checkImage(image)
    await checkingCategories(category)
    await checkingTalents(talent)

    const check = await Events.findOne({title})

    if (check) throw BadRequest('Judul acara sudah terdaftar')

    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent 
    })
}

const getOneEvents = async (req) => {
    const { id } = req.params

    const result = await Events.findOne({ _id: id})
    .populate({ path: 'image', select: ' _id name'})
    .populate({
        path: 'category',
        select: ' _id, name'
    })
    .populate({
        path: 'talent',
        select: '_id name role image',
        populate: {path: 'image', select: ' _id name'}
    })

    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

const updateEvents = async (req) => {
    const { id } = req.params

    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent 
    } = req.body

    const check = await Events.findOne({
        title,
        _id: {$ne: id}
    })

    if( check ) throw new BadRequest(`Judul event sudah ada`)

    const result = await Events.findOneAndUpdate(
        {_id: id},
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent    
        }
    )

    if(! result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

    return result
}

const deleteEvents = async (req) => {
    const { id } = req.params

    const result = await Events.findOneAndRemove({
        _id: id
    })

    if(! result) throw NotFoundError(`Tidak ada acara dengan id : ${id}`)

    return await result.remove()
}

module.exports = {
    createEvents,
    getAllEvents,
    getOneEvents,
    updateEvents,
    deleteEvents
}