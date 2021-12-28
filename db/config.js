require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful ${res}`))
.catch(err => console.log(`Error in DB connection ${err}`));



// const dbName = 'user-managment';
// const url = 'mongodb://localhost:27017' + '/' + dbName;
// // mongoose.connect(url, {useNewUrlParser: true}, () => {
// //     console.log('DB connected');
// // });
// mongoose.connect(url)
//   .then(() => {
//     console.log('Database connected');
//   })
//   .catch((error) => {
//     console.log('Error connecting to database');
//   });
// mongoose.Promise = global.Promise;