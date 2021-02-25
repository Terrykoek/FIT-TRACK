//testing

const express = require('express');
const apps = express.Router();
// const fit = require('../models/fits.js');
const Fits = require('../models/fits.js');


//New route
apps.get('/new', (req, res) => {
    res.render('app/new.ejs');
});



// create route
apps.post('/', (req, res) => {
    apps.create(req.body, (error, createdfit) => {
        // res.send(createdfit);
        res.redirect('/app');
    });
});


// Show route
apps.get("/:id", (req, res) => {
    Fits.findById(req.params.id, (err, foundfit) => {
      res.render("app/show.ejs", {
        fit: foundfit,
      });
    });
  });

  
// POST route
apps.post("/newexercise", (req, res) => {
    Fits.create(req.body, (err, createdfit) => {
      if (createdfit) res.redirect("/app")
      else throw err;
    });
  });


module.exports = apps;