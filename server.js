const express = require('express');
const app = express();
//import the express module


// Serve the "index.htm" file for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.htm');
});

app.use(express.static('public'));
//Configures Express to serve static files from the public folder.

app.get('/api/data', (req, res) => {
    const number = parseFloat(req.query.number);
    const operation = req.query.operation;

    if (isNaN(number)) {
        res.json({ error: 'Invalid number.' });
    } else if (operation === 'square') {
        res.json({ result: number * number });
    } else if (operation === 'cube') {
        res.json({ result: number * number * number });
    } else {
        res.json({ error: 'Invalid operation.' });
    }
});

//dynamic endpoint



function generateResponse(argument) {
    const number = parseFloat(argument);
    // convert as a number
    // check if it's a valid number
    if(!isNaN(number)) {
        const square = number * number;
        return {
            number: number,
            square: square
        };
    }else {
        //if argument not valid, sends an error
        return {error: 'Invalid argument. Please provide a number.'};
    }
}

//generate a json reponse



// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next(); // Move to the next middleware or route handler
  });
  
  // Define a route
  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });


  const port = process.env.PORT || 3000;

  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  })
  