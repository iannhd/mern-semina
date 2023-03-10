const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    urlDb : process.env.URL_MONGO_DB_DEV,
    jwtExpiration: `24h`,
    jwtSecret: 'jwtSecret',
    gmail: process.env.EMAIL,
    password: process.env.PASSWORD
}