# polling-system
A polling system to add questions, multiple options for each question and upvote options

# Requirements
https://docs.google.com/document/d/1VPL2KtAOKUcARkwllBBD2KvjsfvQpB5KEfzTi2IxLKs/edit?ts=5e85db3c#

# Prerequisites
  - Node
  - MongoDB

# Set up and execution 
1. Clone the repository from https://github.com/arunsridher/polling-system.git
2. Move to the cloned folder
3. Install the necessary dependencies 
4. Run the application using the command "npm start"

# Request routes - Base url: http://localhost:8000/api/v1

1. /questions/create -> create one or more questions
  Method : POST
  Request :
    Content-Type: application/json
    Body -> raw
    {
      "questions": [
        {
          "title": "Question 1"
        },
        {
          "title": "Question 2"
        },
        {
          "title": "Question 3"
        }
      ]
    }
  Response : Message indicating request status success/failure

2. /questions/:id/options/create -> create one or more options for the specified question
  Method : POST
  Request :
    question id in url
    Content-Type: application/json
    Body -> raw
    {
      "options": [
        {
          "text": "option 1"
        },
        {
          "text": "option 2"
        }
	    ]
    }
  Response : Message indicating request status success/failure

3. /questions/:id/delete -> Delete a question and its options unless an option has upvotes
  Method: DELETE
  Request:
    question id in url
  Response : Message indicating request status success/failure

4. /questions/:id -> To view a question and its options
  Method: GET
  Request:
    question id in url
  Response : Question with responses if success or failure message

5. /options/:id/delete -> Delete an option if it has no upvotes
  Method: DELETE
  Request:
    option id in url
  Response : Message indicating request status success/failure

6. /options/:id/add_vote -> upvote an option
  Method: GET
  Request:
    option id in url
  Response : Message indicating request status success/failure