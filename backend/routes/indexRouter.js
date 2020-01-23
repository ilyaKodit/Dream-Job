const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();

// const User = require('../models/userSchema');

// mongoose.connect('mongodb://localhost/DreamJob', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


router.get('/', async (req, res) => {


    res.json({test: 'hello bro!'});
});

router.post('/reg', async (req, res) => {

    await console.log(req.body);
    res.json({flag: true});
});


module.exports = router;
