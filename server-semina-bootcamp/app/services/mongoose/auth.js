const User = require('../../api/v1/users/model')
const { BadRequest, Unauthorized} = require('../../errors')
const {createTokenUser, createJWT} = require('../../utils')

const signin = async (req) => {
    const {email, password} = req.body

    if(!email || !password) throw new BadRequest(`Please provide email and password`)

    const result = await User.findOne({email:email})

    if(! result) throw new Unauthorized(`Invalid credentials`)

    const isPasswordCorrect = await result.comparePassword(password)

    if(! isPasswordCorrect) throw new Unauthorized(`Invalid credentials`)

    const token = createJWT({payload: createTokenUser(result)})

    return token
}

module.exports = { signin }