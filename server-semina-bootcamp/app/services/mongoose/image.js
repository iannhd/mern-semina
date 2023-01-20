const Image = require('../../api/v1/images/model')

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

module.exports = {createImage, generateUrlImage}