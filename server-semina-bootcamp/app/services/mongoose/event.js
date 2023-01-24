// import model Events
const Events = require('../../api/v1/events/model')
const { checkImage } = require('./image')
const { checkCategories } = require('./categories')
const { checkTalents } = require('./talents')

// import custom error
const {NotFoundError, BadRequest} = require('../../errors')

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query
    let condition = { organizer: req.user.organizer}

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
    await checkCategories(category)
    await checkTalents(talent)

    const check = await Events.findOne({title})

    if (check) throw new BadRequest('Judul acara sudah terdaftar')

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
        talent,
        organizer: req.user.organizer
    })
    
    return result
}

const getOneEvents = async (req) => {
    const { id } = req.params

    const result = await Events.findOne({ _id: id,  organizer: req.user.organizer})
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

    if (!result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

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
    
    // cek apakah ada event dengan id yang dimasukkan
    const checkEvent = await Events.findOne({
        _id:  id,
        
    })

    if(!checkEvent) throw new NotFoundError(`Tidak ada event dengan id : ${id}`)
    console.log(checkEvent, "=====> ini check");
    
    const check = await Events.findOne({
        title,
        organizer: req.user.organizer,
        _id: {$ne: id}
    })
    console.log(check, "=====> ini check");
    if(check) throw new BadRequest(`Judul event sudah ada`)

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
            talent,
            organizer: req.user.organizer 
        }
    )

    if(! result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

    return result
}

const deleteEvents = async (req) => {
    const { id } = req.params

    const result = await Events.findOneAndRemove({
        _id: id,
        organizer: req.user.organizer
    })

    if(! result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

    return await result.remove()
}

const changeStatusEvents = async (req) => {
    const { id } = req.params
    const { statusEvent } =  req.body
    // cari even berdasarkan field id

    const checkEvent = await Events.findOne({
        _id: id,
        organizer: req.user.organizer
    })

    if (! checkEvent) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

    checkEvent.statusEvent = statusEvent

    await checkEvent.save()

    return checkEvent
}

module.exports = {
    createEvents,
    getAllEvents,
    getOneEvents,
    updateEvents,
    deleteEvents,
    changeStatusEvents
}