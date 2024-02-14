const express = require('express')
const cors = require('cors')
const userController = require('./controllers/userController')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/users', userController.register)
app.get('/validate/:token', userController.validate)

app.listen(4002, () => {
  console.log(`listening at http://localhost:4002`)
})