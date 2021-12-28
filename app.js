const express = require('express');
const app = express();
require('./db/config');

app.use(express.json());

const userRoute = require('./app/routes/user.routes');
app.use('/', userRoute);

// set up port number
const port = 5035;
app.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});