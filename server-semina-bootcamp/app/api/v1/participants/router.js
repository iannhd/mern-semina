const express = require('express');
const router = express();
const {  signup, signin, activeParticipant, getAllLandingPage, getDetailLandingPage, getDashboard, checkout } = require('./controller')

const {
    authenticateUser, authorizeRole, authenticateParticipant
} = require('../../../middlewares/auth')


router.post('/auth/signup', signup)
router.post('/auth/signin', signin)
router.post('/active', activeParticipant)
router.post('/checkout', authenticateParticipant, checkout)

router.get('/events', getAllLandingPage)
router.get('/events/:id', getDetailLandingPage)
router.get('/orders', authenticateParticipant, getDashboard)

module.exports = router;