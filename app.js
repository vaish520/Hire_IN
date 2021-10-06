const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const path = require('path');
const User = require('./model/user');
const bcrypt = require('bcrypt');


mongoose.connect('mongdb://localhost:27017/login-app',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}, ()=> console.log("DB Connected"))


//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// app.get('/', (req,res) => {
//     res.sendFile(__dirname+'/views/');
// });
app.get('/',(req,res)=>{

    res.render('login');
})
app.get('/index',(req,res)=>{

    res.render('index');
})
app.get('/register',(req,res)=>{

    res.render('register');
})
app.post('/api/login', async(req,res) =>{
    console.log(req.body)
   const { email, password: plainTextPassword  }= req.body

   const password = await bcrypt.hash(plainTextPassword,10)

   try{
       const response = await User.create({
           email,
           password
       })
       console.log("User created successfully!", response)
   } catch(error){
       console.log(error);
       return res.json({ status: error })
   }
    res.json ({ status : 'ok' })
})

//Import Route 


//Use View Engine
app.set('view engine','ejs')

//Middleware route



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`This app is listening on port ${PORT}`));


