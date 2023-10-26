

// Create a new file in the project directory, e
// Import the required modules at the top of the file:
const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const redis = new Redis();

//Create an instance of the Express application:

const app = express();
// Add middleware to parse incoming request bodies:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/ Define a middleware to check Redis cache first
const checkCache = (req, res, next) => {
  const { key } = req.params;

  redis.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(data); // If data exists in cache, return it
    } else {
      next(); // If not, proceed to the route handler
    }
  });
};

const users = []; // Assuming you have an array to store users

// Define the routes for your API.
app.get('/api/users', (req, res) => {
    //console.log("kamal");
    res.json(users);
  });
  app.post('/api/users',checkCache (req, res) => {
    const { id } = req.params;  
    const user = users.find(user => user.id === parseInt(id));
  });
  if (user) {
    redis.set(id, JSON.stringify(user)); // Set data in cache
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({ message: 'User created successfully' });
});

  // Start the server and listen on a specified port:
  const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



