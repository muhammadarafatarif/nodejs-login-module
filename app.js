const express = require('express');
const app = express();
require('./db/config');

app.use(express.json());

const userRoute = require('./app/routes/user.routes');
app.use('/', userRoute);

// set up port number
const port = process.env.PORT;
app.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});