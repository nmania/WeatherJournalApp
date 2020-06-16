// Setup empty JS object to act as endpoint for all routes
const projectData = {};
let counter = 0;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

const listening = () => {
    console.log('server is up!');
    console.log('listening at port ' + port);
}

const server = app.listen(port, listening);

// Main Functions
const getWeatherData = (req, res) => res.send(projectData);

const addNewWeatherData = (req, res) => {
    const newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    const key = counter;
    projectData[key] = newEntry;
    counter += 1; 
    res.send(newEntry);
}

// Routes
app.get('/allweatherdata', getWeatherData);

app.post('/weatherdata', addNewWeatherData);
