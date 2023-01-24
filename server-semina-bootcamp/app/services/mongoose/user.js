const User = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizers/model')
const { BadRequest } = require('../../errors')

const createOrganizer = async (req) => {
    const { organizer, role, email, password, confirmPassword, name } = req.body

    if(password !== confirmPassword) throw new BadRequest('Password dan Confirm Password tidak sesuai')

    const result = await Organizer.create({
        organizer
    })

    const users = await User.create({
        email,
        name,
        password,
        confirmPassword,
        role,
        organizer: result._id
    })

    delete users._doc.password

    return users
}

module.exports = {createOrganizer}