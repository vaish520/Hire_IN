const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const path = require('path');

const auth = require('./routes/auth');
require("dotenv").config();



//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use('/', auth);


app.get('/index',(req,res)=>{

    res.render('index');
})

app.get('/hireapply',(req,res)=>{

    res.render('apply');
})
app.get('/hirenow',(req,res)=>{

    res.render('hirenow');
})






//Import Route 


//Use View Engine
app.set('view engine','ejs')

//Middleware route



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`This app is listening on port ${PORT}`));


