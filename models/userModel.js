const fs = require('fs/promises')
const uuid = require('uuid')

const addUser = async (email, password, username) => {
  console.log(__dirname + '/users.json')
  const usersText = await fs.readFile(__dirname + '/users.json', { encoding: 'utf-8' })
  const users = JSON.parse(usersText)
  const user = {
    id: Date.now(),
    email,
    username,
    password,
    validateToken: uuid.v4(),
    isValid: false
  }
  users.push(user)
  await fs.writeFile(__dirname + '/users.json', JSON.stringify(users))
  return user
}

const validate = async (token) => {
  const usersText = await fs.readFile(__dirname + '/users.json', { encoding: 'utf-8' })
  const users = JSON.parse(usersText)

  console.log(users)
  const userId = users.findIndex(user => user.validateToken === token)
  if (userId === -1) {
    return null
  }

  const user = users[userId]
  if (user.isValid === true) {
    return null
  }

  user.isValid = true
  users[userId] = user
  await fs.writeFile(__dirname + '/users.json', JSON.stringify(users))
  return user
}

module.exports = {
  addUser,
  validate
}