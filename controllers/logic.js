const express = require('express');
const logic = express.Router();
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
logic.get('/new', isAuthenticated, (req, res) => {
    res.render('app/new.ejs',{
    //   currentUser: req.session.currentUser,
});
});



// create route 
// logic.post('/app', (req, res) => {
//       User.findOneAndUpdate(
//         { _id: req.session.currentUser._id },
//         {
//             $push: {
//                 fits: {
//                     exercise: req.body.exercise,
//                 },
//             },
//         },
//         (error, newFit) => {
//             res.redirect('/app');
//         },
//     );
// });

// index route - User's main page
logic.get('/', isAuthenticated, (req, res) => {
    // finds all users
    User.find({}, (err, foundUsers) => {
      res.render('app/index.ejs', {
        users: foundUsers,
        currentUser: req.session.currentUser
      });
    });
  });

logic.get('/app', (req, res)=>{
	Fits.find({}, (err, foundfits)=>{
		res.render('app/index.ejs', {
			fits: foundfits
		});
	})
});
  
logic.post('/app', (req, res)=>{
	Fits.create(req.body, (err, createdfits)=>{
		res.redirect('/');
	});
});

  // Show route
logic.get("/:id", (req, res) => {
	Fits.findById(req.params.id, (err, foundFit) => {
	  res.render("show.ejs", {
		fit: foundFit,
	  });
	});
  });

module.exports = logic;