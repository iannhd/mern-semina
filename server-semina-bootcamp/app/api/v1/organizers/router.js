const express = require('express');
const router = express();
const { createCMSorganizer, createCMSoUser, getCMSuser} = require('./controller')

const {
    authenticateUser, authorizeRole,
} = require('../../../middlewares/auth')


router.post('/organizers', authenticateUser, authorizeRole('owner'), createCMSorganizer)
router.post('/users', authenticateUser, authorizeRole('organizer'), createCMSoUser)
router.get('/users', authenticateUser, authorizeRole('owner'), getCMSuser)

module.exports = router;