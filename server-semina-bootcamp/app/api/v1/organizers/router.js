const express = require('express');
const router = express();
const { createCMSorganizer, createCMSoUser, } = require('./controller')

const {
    authenticateUser,
} = require('../../../middlewares/auth')


router.post('/organizers', createCMSorganizer)
router.post('/users',authenticateUser, createCMSoUser)

module.exports = router;