const express = require('express');
const userRouter = require('./routes/users');
const bodyparser = require('body-parser');
//const session = require('express-session');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const mongopath = require('./mdbkey.json').dbpath; //Login to your MongoDB database here
mongoose.connect(mongopath, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, err => {
    if (err) console.error(err);
    console.log("Connected to Database.");
});


const app = express();
const PORT = 5000 || process.env.PORT;


//  Set view engine to Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'mainLayout'}));
app.set('view engine', 'handlebars');

//  Body Parser Middleware
app.use(bodyparser.urlencoded({extended: false}));

//  Define Routes
app.use(userRouter);

// Define Session
/*app.use(session({
    key: user_sid,
    secret: 'aykut-boss',
    resave: false,
    saveUninitialized: false,
}));*/

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

