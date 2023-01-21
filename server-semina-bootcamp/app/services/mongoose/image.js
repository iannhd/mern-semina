const Image = require('../../api/v1/images/model')
const { NotFoundError } = require('../../errors')

const generateUrlImage = async () => {
    const result = `uploads/${req.file.filename}`

    return result
}

const createImage = async (req) => {
    const result = await Image.create({
        name: req.file
        ? `uploads/${req.file.filename}`
        :`uploads/avatar/default.jpeg`
    })

    return result
}

const checkImage = async (id) => {
    const result = await Image.findOne({ _id: id})

    if(! result) throw new NotFoundError(`Tidak ada gambar dengan id : ${id}`)

    return result
}


module.exports = {createImage, generateUrlImage, checkImage}