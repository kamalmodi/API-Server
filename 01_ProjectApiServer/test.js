

// Create a new file in the project directory, e
// Import the required modules at the top of the file:
const express = require('express');
const bodyParser = require('body-parser');

//Create an instance of the Express application:

const app = express();
// Add middleware to parse incoming request bodies:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the routes for your API.
app.get('/api/users', (req, res) => {
    console.log("kamal");
    res.json(users);
  });
  app.post('/api/users', (req, res) => {
    const newUser = req.body;  
    res.json({ message: 'User created successfully' });
  });

  // Start the server and listen on a specified port:
  const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



