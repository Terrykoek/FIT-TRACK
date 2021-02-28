// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Configuration
const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// controllers
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const appController = require('./controllers/logic.js');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log(`connected to Mongo`);
});
mongoose.connection.on('error', (err) =>
    console.log(err.message + ' is Mongod not running?'),
);
mongoose.connection.on('connected', () =>
    console.log('mongo connected: ', mongoURI),
);
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

//authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/sessions/new');
    }
};

app.use('/users', userController);
app.use('/sessions', sessionsController);
app.use('/app', appController);

//index page
app.get('/', (req, res) => {
    res.render('index.ejs', {
        currentUser: req.session.currentUser,
    });
});

app.get('/app', isAuthenticated, (req, res) => {
    res.render('app/index.ejs');
});

// Listen to port
app.listen(PORT, () => console.log('auth happening on port', PORT));