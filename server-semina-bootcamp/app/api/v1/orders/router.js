const express = require('express');
const router = express();
const {  index } = require('./controller')

const {
    authenticateUser, authorizeRole,
} = require('../../../middlewares/auth')


router.get('/orders', authenticateUser, authorizeRole('organizer', 'admin', 'owner'), index)

module.exports = router;