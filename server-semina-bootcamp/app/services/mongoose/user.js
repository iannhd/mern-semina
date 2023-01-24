const Users = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizers/model')
const { BadRequest } = require('../../errors')
const { StatusCodes } = require('http-status-codes')

const createOrganizer = async (req) => {
    const { organizer, role, email, password, confirmPassword, name } = req.body

    if(password !== confirmPassword) throw new BadRequest('Password dan Confirm Password tidak sesuai')

    const result = await Organizer.create({
        organizer
    })

    const users = await Users.create({
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

const createUsers = async (req, res, next) => {
    const {name, password, role, confirmPassword, email } = req.body

    if( password !== confirmPassword ) throw new BadRequest('Password dan Confirm Password tidak sesuai')

    const result = await Users.create({
        name,
        email,
        organizer: req.user.organizer,
        password,
        role
    })

    res.status(StatusCodes.CREATED).json({
        data: result
    })

    return result
}

module.exports = {createOrganizer, createUsers}