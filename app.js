const express = require('express');
const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))

// app.get('/', (req,res) => {
//     res.sendFile(__dirname+'/views/');
// });

//Import Route 
const covRoute = require('./routes/index');

//Use View Engine
app.set('view engine','ejs')

//Middleware route
app.use('/', covRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`This app is listening on port ${PORT}`));


