const mail = require('../utils/mail')
const userModel = require('../models/userModel')

const register = async (req, res) => {
  const {
    email,
    password,
    username
  } = req.body
  const user = await userModel.addUser(email, password, username)
  //Send email
  await mail.sendWelcomeEmail(user)
  res.json({
    email: user.email,
    id: user.id,
    isValid: user.isValid
  })
}

const validate = async (req, res) => {
  const { token } = req.params
  const user = await userModel.validate(token)
  if (!user) {
    return res.status(404).send()
  }
  return res.redirect('http://localhost:3000')
}

module.exports = {
  register,
  validate
}