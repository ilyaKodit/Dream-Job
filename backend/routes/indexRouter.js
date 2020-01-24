const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();

const User = require('../model/user');


router.get('/', async (req, res) => {


    res.json({test: 'hello bro!'});
});

router.post('/reg', async (req, res) => {

    let existenceUser = await User.findOne({email: req.body.email});

    if (!existenceUser) {

        let newUser = new User({
            login: req.body.login,
            password: req.body.pass,
            email: req.body.email
        });
        newUser.save().then((data) => {
            res.json(data._id);
        });

    } else {
        res.json(false);
    }

});


module.exports = router;
