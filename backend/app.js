const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require("session-file-store")(session);

const app = express();

app.use(session({
    store: new FileStore(),
    key: "user_sid",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);





// app.use(function (req, res, next) {
//   app.locals.isUser = !!req.session.user;
//   if (req.session.user) {
//     app.locals.userName = req.session.user.username;
//   }
//   next();
// });


module.exports = app;
