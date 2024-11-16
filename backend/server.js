require('dotenv').config()

const express = require('express')
const app = express()
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

// cors
app.use(cors({
  origin: 'https://task-buddy-ee2n.onrender.com',
  credentials: true
}))

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method} method invoked at path ${req.path}`)
  next()
})

// routes
app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to DB & app listening at port 3000')
    })
  })
  .catch(er => console.log(er))

module.exports = app