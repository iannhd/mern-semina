const {Unauthenticated, Unauthorized} = require('../errors')
const {isTokenValid} = require('../utils/jwt')

const authenticateUser = async (req, res, next) => {

    try {
        let token
        const authHeader = req.headers.authorization

        if(authHeader && authHeader.startsWith('Bearer')){
            token = authHeader.split(' ')[1]
        }

        if(! token) throw new Unauthenticated(`Authentication failed`)

        const payload = isTokenValid({ token })

        // Attach the user and his permissions to req the object

        req.user = {
            email       : payload.email,
            role        : payload.role,
            name        : payload.name,
            organizer   : payload.organizer,
            id          : payload.userId
        }

        next()
    } catch (error) {
        next(error)
    }

}

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if(! roles.includes(req.user.role)){
            throw new Unauthorized(`Unauthorized access to this route`)
        }

        next()
    }
}

module.exports = {authenticateUser, authorizeRole}