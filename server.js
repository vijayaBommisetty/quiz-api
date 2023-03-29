// Import the required modules
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const questionsData = require('./questionsSet.js');
const _ = require("lodash"); 
const cors = require("cors");
// Create a new Express app instance
const app = express();
app.use(cors());
// Get the PORT number from the environment variables, or use 7000 as the default
const { PORT = 7000 } = process.env;

// Set up the view engine (ejs) for rendering HTML templates
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Set up body-parser middleware to handle incoming requests with JSON payloads
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Define a route to get a random set of quiz questions
app.get("/quiz/:numberOfQuestions", (req, res) => {
	// Get the count of questions to retrieve from the request parameter
	const numberOfQuestions = req.params.numberOfQuestions;
	// Handle the case when the requested count is greater than the total number of questions available
	if(numberOfQuestions>questionsData.length){
       const data = {
        status: "error",
        message: "Number of requested questions is greater than the total number of available questions."
      };
      return res.status(400).json(data);
	}
	// Shuffle the array of questions and take a random slice of the specified size
	let randomQuestions = (_.shuffle(questionsData)).slice(0,numberOfQuestions);
	// Return the questions as a JSON response
    try {
        const data = {
            status: "success",
            data: randomQuestions
        };
       return res.status(200).json(data);
    } catch (error) {
        const data = {
            status: "error",
            message: "Failed to load quiz questions"
        };
       return res.status(500).json(data);
    }
});

// Start the server and listen on the specified port
const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

module.exports = server;