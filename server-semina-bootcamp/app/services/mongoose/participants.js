const Events  = require('../../api/v1/events/model')
const Orders  = require('../../api/v1/orders/model')
const Participant = require('../../api/v1/participants/model')
const {BadRequest, NotFoundError, Unauthorized} = require('../../errors')
const { createJWT, createTokenParticipant } = require('../../utils')

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

    delete result._doc.password

    return result
}

const activateParticipant = async (req) => {
    const { otp, email } = req.body

    const check = await Participant.findOne({
        email
    })

    if(! check ) throw new NotFoundError(`Partisipan belum terdaftar`)

    if( check && check.otp !== otp) throw new BadRequest('Kode otp salah') 

    const result = await Participant.findByIdAndUpdate( 
        check._id, 
        { status: 'aktif'}, 
        {new: true, runValidators: true}
    )

    delete result._doc.password
    delete result._doc.otp

    return result
}

const signinParticipant = async (req) => {
    const {email, password} = req.body

    if(! email || ! password) {
        throw new BadRequest('Please provide email dan password')
    }

    const result = await Participant.findOne({email: email})

    if(! result ) throw new Unauthorized('Invalid Credentials')

    if(result.status === 'tidak aktif') throw Unauthorized ('Akun Anda belum aktif')

    const isPasswordCorrect = await result.comparePassword(password)

    if (! isPasswordCorrect) throw new Unauthorized('Invalid Credentials')


    const token = createJWT({ payload: createTokenParticipant(result)})

    return token
}

const getAllEvents = async (req) => {
    const result = await Events.find({statusEvent: 'Published'})
    .populate('category')
    .populate('image')
    .select('_id title date tickets venueName')

    return result
}

const getOneEvent = async (req) => {
    const id = req.params.id
    const result = await Events.find({ _id: id})
    .populate('category')
    .populate('talent')
    .populate('image')

    if(! result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

    return result
}

const getAllOrders = async (req) => {
    const result = await Orders.find({ participant: req.participant.id})

    return result
}


module.exports = {
    signUpParticipant,
    signinParticipant,
    activateParticipant,
    getAllEvents,
    getOneEvent,
    getAllOrders,
}