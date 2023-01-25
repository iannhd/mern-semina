const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller')

const { 
    authenticateUser,
    authorizeRole
} = require('../../../middlewares/auth')

router.get('/payments', 
authenticateUser, 
authorizeRole('organizer'), 
index)

router.get('/payments/:id', 
authenticateUser, 
authorizeRole('organizer'), 
find)

router.put('/payments/:id', 
authenticateUser, 
authorizeRole('organizer'), 
update)

router.post('/payments', 
authenticateUser, 
authorizeRole('organizer'), 
create)

router.delete('/payments/:id', 
authenticateUser, 
authorizeRole('organizer'), 
destroy)



module.exports = router;