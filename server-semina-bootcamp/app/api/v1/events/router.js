const express = require('express');
const router = express();
const { create, index, find, update, destroy, changeStatus } = require('./controller')

const { 
    authenticateUser,
    authorizeRole
} = require('../../../middlewares/auth')

router.get('/events', 
authenticateUser, 
authorizeRole('organizer'), 
index)

router.post('/events', 
authenticateUser, 
authorizeRole('organizer'), 
create)

router.get('/events/:id', 
authenticateUser, 
authorizeRole('organizer'), 
find)

router.put('/events/:id', 
authenticateUser, 
authorizeRole('organizer'), 
update)

router.delete('/events/:id', 
authenticateUser, 
authorizeRole('organizer'), 
destroy)

router.put('/events/:id/status', 
authenticateUser, 
authorizeRole('organizer'), 
changeStatus)

module.exports = router;