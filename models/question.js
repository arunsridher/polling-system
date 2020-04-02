//include mongoose
const mongoose = require('mongoose');

//create question schema
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Option'
    }
  ]
},{
  timestamps: true
});

//create Question model
const Question = mongoose.model('Question', questionSchema);

//export Question model
module.exports = Question;