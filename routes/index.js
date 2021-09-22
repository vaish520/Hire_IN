const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');


router.get('/',(req,res)=>{

    res.render('login');
})
router.get('/index',(req,res)=>{

    res.render('index');
})
router.post('/',(req,res,next) =>{
    passport.authenticate('local',
    (err,user,info) =>{
        if(err){
            return next(err);
        }
        if(!user){
            return res.redirect('/?info='+info);
        }
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
            return res.redirect('/index');
        });

    })
    (req,res,next);
})
// router.post('/',(req,res)=>{
//     let email = req.body.email;
//     let password = req.body.password;
//     res.send (`Email Address: ${ email } Password: ${ password }`);
// });


module.exports = router;