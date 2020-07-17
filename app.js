const express = require('express');
const userRouter = require('./routes/users');
const bodyparser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const _handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const mongopath = require('./mdbkey.json').dbpath; //Login to your MongoDB database here

const app = express();
const PORT = 5000 || process.env.PORT;

//  Flash Middlewares
app.use(cookieParser("aykutboss"));
app.use(session({ 
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,
    secret: "aykutboss"
}));
app.use(flash());


//  Passport
app.use(passport.initialize());
app.use(passport.session());



//  Global - Res.locals
app.use((req, res, next) => {
    
    res.locals.user = req.user;

    res.locals.registerSuccess = req.flash("registerSuccess");
    res.locals.passportFailure = req.flash("error");
    res.locals.passportSuccess = req.flash("success");
    next();
});


//  Mongoose Connection
mongoose.connect(mongopath, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, err => {
    if (err) console.error(err);
    console.log("Connected to Database.");
});

//  Set view engine to Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'mainLayout',
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set('view engine', 'handlebars');


//  Body Parser Middleware
app.use(bodyparser.urlencoded({extended: false}));


//  Define Routes
app.use(userRouter);


app.get("/" , (req, res, next) => {
    res.render("pages/index");
});


//  404 Page
app.use((req, res, next) => {
   res.send("404 Page Cannot be Found"); 
});


app.listen(PORT, ()=>{
    console.log("App has started!");
});

