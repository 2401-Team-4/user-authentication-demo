const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
  quotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote'
    }
  ],
})

// Hides ids and password hash from public exposure
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User