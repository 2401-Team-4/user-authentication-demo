const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  title: {type: String, required: true },
  author: {type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Hides id from public exposure
quoteSchema.set('toJSON', { 
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Quote', quoteSchema)