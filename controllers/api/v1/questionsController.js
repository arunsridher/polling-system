const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

const url = 'http://localhost:8000/options/';

module.exports.createQuestion = async function(req, res){
  try{

    let questions = req.body.questions;
    console.log(questions);

    for(let i = 0; i < questions.length; i++){
      await Question.create({
        title: questions[i].title
      });
    }

    return res.status(200).json({
      message: "Question created successfully"
    });
  }catch(err){
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }
}

module.exports.addOptions = async function(req, res){
  try{

    let id = req.params.id;
    let options = req.body.options;

    let optionObjArr = [];
    for(let i = 0; i < options.length; i++){
      optionObjArr[i] = await Option.create({
        text: options[i].text,
        votes: 0
      });
    }

    let optionIds = [];
    optionObjArr.forEach(option => {
      optionIds.push(option._id);
    });

    for(let i = 0; i < optionIds.length; i++){
      let id = optionIds[i];
      let link = url+id+'/add_vote';
      await Option.findByIdAndUpdate(id, {link_to_vote: link})
    }

    let question = await Question.findById(id);
    optionIds.forEach(op => {
      question.options.push(op);
    });
    question.save();

    return res.status(200).json({
      message: "Options added to the question successfully"
    });
  }catch(err){
    return res.status(500).json({
      message: "Internal Severe Error"
    });
  }
}

