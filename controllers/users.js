  
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();


// new user 
//new route using GET method
users.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// Bcrypt password for new user
// salting the password of user
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10),
    );
    User.create(req.body, () => {
        res.redirect('/');
    });
});

module.exports = users;