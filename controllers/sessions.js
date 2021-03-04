const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();

// new sessions
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

// POST error for new session
sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (error, userFound) => {
        if (error) {
            res.send('oops something went wrong');
        } else if (!userFound) {
            res.send('unable to find user');
        } else {
            if (bcrypt.compareSync(req.body.password, userFound.password)) {
                req.session.currentUser = userFound;
                res.redirect('/');
            } else {
                res.send('<a href="/">wrong password</a>');
            }
        }
    });
});

//Destroy sessions and redirect
sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = sessions;