const express = require('express')
const mongoose = require('mongoose')
const authenticate = require('./middlewares/authenticate')
const errorHandler = require('./middlewares/errorHandler')
const viewRouter = require('./viewRouter')
const apiRouter = require('./apiRouter')

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
// middleware for json body parsing
app.use(express.json())
// middleware for authenticatio
app.use(authenticate)
app.use('/api', apiRouter)
app.use('/', viewRouter)
app.use(errorHandler)

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const port = 3000

app.listen(port, () => console.log('Server running...'))
