//testing

const express = require('express');
const logic = express.Router();
// const fit = require('../models/fits.js');
const Fits = require('../models/fits.js');


//New route
logic.get('/new', (req, res) => {
    res.render('app/new.ejs');
});

// POST route
logic.post("/newexercise", (req, res) => {
  Fits.create(req.body, (err, createdFit) => {
    res.redirect("/app")
  });
});



// create route
logic.post('/', (req, res) => {
    Fits.create(req.body, (error, createdFit) => {
        res.redirect('/app');
    });
});


// Show route
logic.get("/:id", (req, res) => {
    Fits.findById(req.params.id, (err, foundFit) => {
      res.render("app/show.ejs", {
        fit: foundFit,
      });
    });
  });

  
// Edit route
// logic.get("/:id/edit", (req, res) => {
//   Fits.findById(req.params.id, (err, foundfit) => {
//     res.render("app/edit.ejs", {
//         fit: foundFit,
//       });
//   });
// });

// Index route
logic.get("/", (req, res) => {
  Fits.find({}, (err, allfits) => {
    if (err) console.error(err.message);
    else {
      res.render("app/index.ejs", {
        fits: allfits,
      });
    }
  });
});
module.exports = logic;