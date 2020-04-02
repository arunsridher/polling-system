const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

module.exports.deleteOption = async function(req, res){
  try{

    let id = req.params.id;
    let option = await Option.findById(id);
    
    if(option.votes > 0){
      return res.status(404).json({
        message: "Option cannot be deleted as it has votes"
      });
    }
    
    await Question.findByIdAndUpdate(option.question, {$pull: {options: id}});
    await Option.findByIdAndDelete(id);
    
    return res.status(200).json({
      message: "Option deleted successfully"
    });
  }catch(err){
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }  
}

module.exports.addVote = async function(req, res){
  try{

    let id = req.params.id;
    await Option.findByIdAndUpdate(id, { $inc: {votes:1}});

    return res.status(200).json({
      message: "Vote added successfully"
    });
  }catch(err){
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }
}