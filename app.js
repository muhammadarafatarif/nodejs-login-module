const express = require('express');
const app = express();

// set up port number
const port = 5035;

// set up home route
app.get('/', (request, respond) => {
  respond.status(200).json({
    message: 'Welcome to Project Support',
  });
});

app.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});