const nodemailer = require('nodemailer')
const {gmail, password} = require('../../config')
const Mustache = require('mustache')
const fs = require('fs')

const tranpsorter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: gmail,
        pass: password
    }
})

const otpMail = async (email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/otp.html', 'utf-8')

        let message = {
            from: gmail,
            to: email,
            subject: 'Otp for registration login',
            html: Mustache.render(template, data)
        }

        console.log(message.to);

        return await tranpsorter.sendMail(message)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {otpMail}