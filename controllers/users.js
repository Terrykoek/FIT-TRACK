const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//new user 
users.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

users.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            console.log(err);
        }
        console.log(createdUser);
        res.redirect('/');
    });
});


module.exports = users;