const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'fernando.calvo.sanz@gmail.com',
    pass: 'lxef rcmr vkua eldu',
  },
});

const sendWelcomeEmail = async (user) => {
  await transporter.sendMail({
    from: 'app@info.com',
    to: user.email,
    subject: 'welcome',
    html: `Valida tu cuenta <a href="http://localhost:4002/validate/${user.validateToken}">Validar</a>`
  })
}

module.exports = {
  sendWelcomeEmail
}