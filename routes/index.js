const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('login');
})

router.post('/',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    res.send (`Email Address: ${ email } Password: ${ password }`);
});

module.exports = router;