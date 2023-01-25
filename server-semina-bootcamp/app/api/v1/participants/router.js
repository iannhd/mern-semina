const express = require('express');
const router = express();
const {  signup, signin, activeParticipant, getAllLandingPage, getDetailLandingPage } = require('./controller')

const {
    authenticateUser, authorizeRole,
} = require('../../../middlewares/auth')


router.post('/auth/signup', signup)
router.post('/auth/signin', signin)
router.post('/active', activeParticipant)
router.get('/events', getAllLandingPage)
router.get('/events/:id', getDetailLandingPage)

module.exports = router;