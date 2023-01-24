const Participant = require('../../api/v1/participants/model')
const {BadRequest, NotFoundError, Unauthorized} = require('../../errors')

const {otpMail} = require('../mail/index')

const signUpParticipant = async ( req ) => {
    const {firstName, lastName, email, password, role } = req.body

    let result = await Participant.findOne({
        email,
        status: 'tidak aktif'
    })

    if( result ) {
        result.firstName = firstName,
        result.lastName = lastName,
        result.role = role,
        result.email = email,
        result.password = password,
        result.otp = Math.floor(Math.random() * 9999)
        await result.save()
    } else {
        result = await Participant.create({
            firstName,
            lastName,
            email,
            password,
            role,
            otp: Math.floor(Math.random() * 9999)
        })
    }

    await otpMail(email, result)

    return result
}

module.exports = {
    signUpParticipant
}