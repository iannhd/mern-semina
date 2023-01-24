const express = require('express');
const router = express();
const { createCMSorganizer, } = require('./controller')

router.post('/organizers', createCMSorganizer)

module.exports = router;