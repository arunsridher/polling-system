//include mongoose and related models
const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

// fixed url string; we use this in vote link
const url = 'http://localhost:8000/options/';

//create one or more questions
module.exports.createQuestion = async function(req, res){
  try{
    //fetch the questions from request body
    let questions = req.body.questions;
    console.log(questions);

    //for each question in the questions array create a question in database
    for(let i = 0; i < questions.length; i++){
      await Question.create({
        title: questions[i].title
      });
    }

    //return success response
    return res.status(200).json({
      message: "Question(s) created successfully"
    });
  }catch(err){
    //if error
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }
}

// add one or more options to a question
module.exports.addOptions = async function(req, res){
  try{
    // fetch the question id and options array
    let id = req.params.id;
    let options = req.body.options;

    //see if the question exists otherwise return
    let question = await Question.findById(id);
    if(!question){
      return res.status(404).json({
        message: "Question not found"
      });
    }

    // for each option in the options array create an option object and store the refernces
    let optionObjArr = [];
    for(let i = 0; i < options.length; i++){
      optionObjArr[i] = await Option.create({
        text: options[i].text,
        votes: 0,
        question: id
      });
    }

    //extract option object id's
    let optionIds = [];
    optionObjArr.forEach(option => {
      optionIds.push(option._id);
    });

    //update each object with the link for up voting
    for(let i = 0; i < optionIds.length; i++){
      let id = optionIds[i];
      let link = url+id+'/add_vote';
      await Option.findByIdAndUpdate(id, {link_to_vote: link})
    }

    //push the option objects to the questions options array
    optionIds.forEach(op => {
      question.options.push(op);
    });
    question.save();

    //return success message
    return res.status(200).json({
      message: "Option(s) added to the question successfully"
    });
  }catch(err){
    //if error
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }
}

//fetch a question
module.exports.fetchQuestion = async function(req, res){
  try{
    //fetch the id from request params
    let id = req.params.id;

    //fetch the question from database with options
    let question = await Question.findById(id, 'title options')
      .populate({
        path: 'options',
        select: 'text votes link_to_vote'
      });

    //if question not found
    if(!question){
      return res.status(404).json({
        message: "Question not found"
      });
    }

    //return success message
    return res.status(200).json({
      message: "Question fetched successfully",
      question: question
    });
  }catch(err){
    //if error
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }
}

//delete a question
module.exports.deleteQuestion = async function(req, res){
  try{
    //fetch the id from request params
    let id = req.params.id;

    //fetch the question from database along with up votes for each option
    let question = await Question.findById(id)
      .populate({
        path: 'options',
        select: 'votes'
      });

    //if question not found
    if(!question){
      return res.status(404).json({
        message: "Question not found"
      });
    }

    //check if any of the options has up votes
    let options = question.options;
    for(let i = 0; i < options.length; i++){
      console.log(options[i].votes);
      if(options[i].votes > 0){
        //return if upvotes
        return res.status(404).json({
          message: "Question cannot be deleted as the option(s) has votes"
        });
      }
    }

    //delete options of this question
    await Option.deleteMany({ question: id });

    //delete question
    await Question.findByIdAndDelete(id);
    
    //return success message
    return res.status(200).json({
      message: "Question deleted successfully"
    });
  }catch(err){
    //if error
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }  
}