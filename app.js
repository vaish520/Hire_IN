const express = require('express');
const app = express();
const mongoose = require('mongoose');
const article = require('./routes/article');
// const path = require('path');
const User = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = 'sdkqwertyuiopsasdfghjklzxcvbnm,.!@#$%^&*()+_-;\qsbsnay\pe^jjjsnqll';

mongoose.connect(process.env.MONGO_PROD_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
}).then(()=> console.log("DB Connected"))
.catch(err=>console.log(err))


//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use('/article',article)

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
app.get('/', async(req,res)=>{
    const articles = await article.find().sort({ createdAt: desc})
    res.render('articles/index', {articles: articles})
})

app.post('/login', async(req,res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean()
    if(!user){
        return res.json({ status: 'error', error: 'Invalid email password'})
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({ 
            id: user._id, 
            email : user.email
        }, JWT_SECRET )
        return res.json({ status: 'ok', data: token})
        
    }

    res.json({ status : "error", error: "Inavlid password" })
})

app.post('/register', async(req,res) =>{
   
   const { name, email, college, branch, year, contact, password: plainTextPassword , confirm}= req.body

   if(!email || typeof  email !== 'string'){
       return  res.json({ status: 'error', error: 'Invalid Email' })
   }
   if(!plainTextPassword || typeof  email !== 'string'){
    return  res.json({ status: 'error', error: 'Invalid Password' })
}
if(plainTextPassword.length<5){
    return  res.json({ status: 'error', error: 'Passowrd too small' })
}

   const password = await bcrypt.hash(plainTextPassword,10)
   try{
       const response = await User.create({
           name,
           email,
           college,
           branch,
           year,
           contact,
           password,
           confirm
       })
       console.log("User created successfully!", response)
       
   } catch(error){
       if(error.code === 11000){
        return res.json({ status: 'error', error: 'Username already exists!' })
       }
       throw error 
      
   }
    res.json ({ status : 'ok' });
})

//Import Route 


//Use View Engine
app.set('view engine','ejs')

//Middleware route



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`This app is listening on port ${PORT}`));


