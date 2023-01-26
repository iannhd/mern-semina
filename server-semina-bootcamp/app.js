const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')



const app = express();


//router

const categoriesRouter = require('./app/api/v1/categories/router')
const imageRouter = require('./app/api/v1/images/router')
const talentRouter = require('./app/api/v1/talents/router')
const eventRouter = require('./app/api/v1/events/router')
const organizersRouter = require('./app/api/v1/organizers/router')
const orderRouter = require('./app/api/v1/orders/router')
const participantRouter = require('./app/api/v1/participants/router')
const paymentRouter = require('./app/api/v1/payments/router')
const authCMSRouter = require('./app/api/v1/auth/router')
const v1 = '/api/v1';

// custom error handler

const notFoundMiddleware = require('./app/middlewares/not-found')
const handleErrorMiddleware = require('./app/middlewares/handle-error')



app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to api semina"
    })
})

app.use(`${v1}/cms`, categoriesRouter)
app.use(`${v1}/cms`, imageRouter)
app.use(`${v1}/cms`, talentRouter)
app.use(`${v1}/cms`, eventRouter)
app.use(`${v1}/cms`, organizersRouter)
app.use(`${v1}/cms`, orderRouter)
app.use(`${v1}/cms`, paymentRouter)
app.use(`${v1}`, participantRouter)
app.use(`${v1}/cms`, authCMSRouter)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

module.exports = app;
