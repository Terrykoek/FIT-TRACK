const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();

// new sessions
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

// POST error sessions
sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send('oops something went wrong');
        } else if (!foundUser) {
            res.send('user not found!');
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
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