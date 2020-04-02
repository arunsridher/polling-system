//include mongoose and related models
const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

//delete an option if it has no up votes
module.exports.deleteOption = async function(req, res){
  try{
    //get the id from request parameters and find the option from database
    let id = req.params.id;
    let option = await Option.findById(id);
    
    //if the option has up votes return the corresponding response
    if(option.votes > 0){
      return res.status(404).json({
        message: "Option cannot be deleted as it has votes"
      });
    }
    
    //find the question associated with the option and remove this option from the questions options array
    await Question.findByIdAndUpdate(option.question, {$pull: {options: id}});

    //delete the option
    await Option.findByIdAndDelete(id);
    
    //return success response
    return res.status(200).json({
      message: "Option deleted successfully"
    });
  }catch(err){
    //if error
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }  
}

module.exports.addVote = async function(req, res){
  try{
    //get the id from request parameters
    let id = req.params.id;

    //find the option object and increment the votes by 1
    await Option.findByIdAndUpdate(id, { $inc: {votes:1}});

    //return success response
    return res.status(200).json({
      message: "Vote added successfully"
    });
  }catch(err){
    //if error
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }
}