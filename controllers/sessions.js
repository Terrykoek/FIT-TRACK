
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');


// new session - log in form
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});



// creating new session
sessions.post("/", (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (!foundUser) {
        res.redirect("/sessions/new");
        console.log("no user found");
      } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.redirect("/");
        } else {
          console.log("wrong password");
          res.redirect("/sessions/new");
        }
      }
    });
  });

// Destroy sessions
sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = sessions;
