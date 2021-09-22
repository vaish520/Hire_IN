const express = require('express');
const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}))

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase',
  { useNewUrlParser: true, useUnifiedTopology: true}
);
const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: String,
    password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');
UserDetails.register({username:'paul', active:false}, 'paul');

// app.get('/', (req,res) => {
//     res.sendFile(__dirname+'/views/');
// });

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

//Import Route 
const covRoute = require('./routes/index');

//Use View Engine
app.set('view engine','ejs')

//Middleware route
app.use('/', covRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`This app is listening on port ${PORT}`));


