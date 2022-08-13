const mongoose = require('mongoose');
const { STRING } = require('mysql/lib/protocol/constants/types');

const todosschema = new mongoose.Schema({
  content: {
    type: String,
    required: true

  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('todos', todosschema);