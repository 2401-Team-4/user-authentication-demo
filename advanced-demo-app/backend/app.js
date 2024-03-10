const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const quotesRouter = require('./controllers/quotes')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
// logs requests in and out from the backend 
const morgan = require('morgan')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

// options for morgan => show body of requests as well
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(middleware.tokenExtractor)
app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :body'))

app.use('/api/quotes', quotesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app