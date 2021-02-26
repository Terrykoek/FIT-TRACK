//APP DEPENDENCIES
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const logicController = require('./controllers/logic.js');
require('dotenv').config();
// app.set('views', [__dirname + '/views', __dirname + '/views/app']);


//CONFIGURATION
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || 'localhost:27017/fitnesstracker';

//MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

//DATABASE
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {console.log(`connected to Mongo`)});
mongoose.connection.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('connected', () => console.log('mongo connected: ', mongoURI));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

// check auth
const isAuthenticated = (req, res, next) => {
    // console.log(req.session.currentUser);
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/sessions/new');
    }
};

//user and sessions controllers
app.use('/users', userController);
app.use('/sessions', sessionsController);
app.use('/logic', logicController);

//Index Page
app.get('/', (req,res) => {
    res.render('index.ejs', {
        currentUser: req.session.currentUser
    });
});


app.get('/app', (req, res)=>{
    if(req.session.currentUser){
        res.render('app/index.ejs');
    } else {
        res.redirect('/sessions/new');
    }
});

app.listen(port, () => {
    console.log(`IMS starting, listening at: ${port}`);
});