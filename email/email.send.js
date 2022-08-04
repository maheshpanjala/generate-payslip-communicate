const nodemailer = require('nodemailer')

const credentials = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "panjala.mahesh@gmail.com",
    pass:"avxhewcvlbkkizya"
  }
}

const transporter = nodemailer.createTransport(credentials)

module.exports = async (to, content) => {
  
  const contacts = {
    from: process.env.MAIL_USER,
    to
  }

  const email = Object.assign({}, content, contacts)
  
  await transporter.sendMail(email)
}