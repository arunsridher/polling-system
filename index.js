const express = require('express');
const port = 8000;
const app = express();

//middleware to parse form data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//redirect all urls to routes index.js
app.use('/', require('./routes'));

//start the express on specefied port
app.listen(port, function(err){
  if(err){
    console.log(`Error in starting the server: ${err}`);
    return;
  }
  console.log(`Server up and running on port: ${port}`);
});