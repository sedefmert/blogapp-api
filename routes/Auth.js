const User = require('../models/User');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secret = 'admşfmsşsdfs394wrspfmdmfs';
const salt = bcrypt.genSaltSync(10);


router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
              username,
              password: bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    }catch(e){
        console.log(e)   // e =exception yani istisnaları yakala demek
        res.status(400).json({e})
    }

});

router.post('/login', async (req, res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk= bcrypt.compareSync(password,userDoc.password);
    if(passOk){
        //loged in
        jwt.sign({username,id:userDoc._id}, secret , {}, (err,token)=>{
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
    }else{
        res.status(400).json('wrong credentials');
    }
});

router.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

router.post('/logout' ,(req, res) => {
    res.cookie('token','').json('ok');
});

module.exports = router;