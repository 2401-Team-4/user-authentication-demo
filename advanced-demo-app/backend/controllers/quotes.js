const quotesRouter = require('express').Router()
const Quote = require('../models/quote')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

quotesRouter.get('/', async (request, response) => {
  const quotes = await Quote.find({}).populate('user', {username: 1, name: 1})
  response.json(quotes)
})

quotesRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  
  const quote = new Quote({
    title: body.title,
    author: body.author,
    url: body.url,
    // likes: body.likes,
    user: user.id,
  })

  const savedQuote = await quote.save()
  user.quotes = user.quotes.concat(savedQuote._id)
  await user.save()
  response.status(201).json({
    ...savedQuote._doc,
    username: user.username
  })
})

// quotesRouter.put('/:id', async (request, response) => {
//   const update = { likes: request.body.likes }
//   const updatedQuote = await Quote.findByIdAndUpdate(
//                         request.params.id,
//                         update,
//                         { new: true, runValidators: true, context: 'query'}
//                       )

//   response.status(200).json(updatedQuote)
// })

quotesRouter.delete('/:id', userExtractor, async (request, response) => {
  const parameterId = request.params.id
  const quote = await Quote.findById(parameterId)

  if (quote.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'unauthorized user'})
  }
  
  await quote.deleteOne()
  response.status(204).end()
})

quotesRouter.get('/clearall', async (request, response) => {
  await Quote.deleteMany({})
  response.status(204).end()
})

module.exports = quotesRouter