//include mongoose
const mongoose = require('mongoose');

//create a schema for option
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  votes: {
    type: Number
  },
  link_to_vote: {
    type: String
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
},{
  timestamps: true
});

//create Option model
const Option = mongoose.model('Option', optionSchema);

//export the Model
module.exports = Option;