const mongoose = require('mongoose')

const JokeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be more than 40 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  spoiler: {
    type: Boolean
  }
})

module.exports = mongoose.models.Joke || mongoose.model('Joke', JokeSchema)
