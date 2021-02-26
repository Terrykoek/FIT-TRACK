const express = require('express');
const logic = express.Router();
// const fit = require('../models/fits.js');
const Fits = require('../models/fits.js');
const User = require('../models/users.js');

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
      return next();
  } else {
      res.redirect('/sessions/new');
  }
};


//New route
logic.get('/new', (req, res) => {
    res.render('app/new.ejs');
});



// create route
logic.post('/', (req, res) => {
    logic.create(req.body, (error, createdfit) => {
        // res.send(createdfit);
        res.redirect('/app');
    });
});

// index route - shows user's main page
logic.get('/', isAuthenticated, (req, res) => {
    // finds all users
    User.find({}, (err, foundUsers) => {
      // renders the order page
      res.render('app/index.ejs', {
        // passes the found users to the room page
        users: foundUsers,
        currentUser: req.session.currentUser
      });
    });
  });


// // Show route
// logic.get("/:id", (req, res) => {
//     Fits.findById(req.params.id, (err, foundfit) => {
//       res.render("app/show.ejs", {
//         fit: foundfit,
//       });
//     });
//   });

  
// // POST route
// logic.post("/newexercise", (req, res) => {
//     Fits.create(req.body, (err, createdfit) => {
//       if (createdfit) res.redirect("/app")
//       else throw err;
//     });
//   });


module.exports = logic;