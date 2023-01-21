const Talents = require('../../api/v1/talents/model') // kurang model
const {checkImage} = require('../../services/mongoose/image') //belum dibikin di model

const {BadRequest, NotFoundError} = require('../../errors/index.js')

const getAllTalents = async (req) => {
    const { keyword } = req.query

    let condition = {}

    if (keyword){
        condition = {...condition, name : {$regex: keyword, $options: 'i'}}
    }

    const result = await Talents.find(condition)
        .populate({
            path: 'image',
            select: '_id name'
        })
        .select('_id name role image')

        return result
}

const createTalents = async (req) => {
    const {name, role, image} = req.body

    // cari image dengan field image
    await checkImage(image)

    // cari talents dengan field name
    const check = await Talents.findOne( {name} )

    // apabila check true / data talents sudah ada maka kita tampilkan bad request dengan error pembicara sudah ada

    if(check) throw new BadRequest('Nama Pembicara sudah ada')

    const result = await Talents.create({name, image, role})

    return result
}

const getOneTalents = async (req) => {
    const { id } = req.params

    const result = await Talents.findOne({ _id: id})
    .populate({
        path: 'image',
        select: '_id name'
    })
    .select('_id name role image')

    if(! result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

const updateTalents =  async (req) => {
    const { id } = req.params 
    const { name, image , role} = req.body

    // cari image dengan field image
    await checkImage(image)

    // cari talents dengan field name dan id selain dari id yang dikirim dari params
    const check = await Talents.findOne({
        name,
        _id: {$ne: id}
    })

    // apabila check true / data talents sudah ada maka kita tampilkan error bad request dengan message nama pembicara duplikat

    if(check) throw new BadRequest(`Nama Pembicara Duplikat`)

    const result = await Talents.findOneAndUpdate(
        {_id: id},
        {name, image, role},
        {new: true, runValidators: true}
    )

    if(! result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`)

    return result
}   

const deleteTalents = async (req) => {
    const { id } = body.req

    const result = await Talents.findOne({
        _id: id
    })

    if(! result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    await result.remove()

    return result
}

const checkingTalents = async (req) => {
    const result = await Talents.findOne({
        _id : id
    })

    if (! result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

module.exports = {
    getAllTalents,
    createTalents,
    getOneTalents,
    updateTalents,
    deleteTalents,
    checkingTalents
}


