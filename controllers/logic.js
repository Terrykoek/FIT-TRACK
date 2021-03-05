const Mongoose = require('mongoose');
const express = require('express');
const routes = express.Router();
const User = require('../models/users.js');
const moment = require('moment');

//route middleware function to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) { //if its currentUser from current session return next
        return next();
    } else {
        res.redirect('/sessions/new');
    }
};

// GET new workout page
routes.get('/new', (req, res) => {
    res.render('app/new.ejs');
});


// GET Homepage
//use findbyID function to find current user's ID and render to index page
routes.get('/', isAuthenticated, (req, res) => {
    User.findById({ _id: req.session.currentUser._id }, (err, currentUser) => { //find current user by ID
        res.render('app/index.ejs', {
            currentUser: currentUser,
        });
    });
});

// Create route using post method
// if req.body.completed is true, use findOneAndUpdate method to find currentuser id
routes.post('/', (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }
    User.findOneAndUpdate(
        { _id: req.session.currentUser._id },//find currentUser and push fits data into the currentUser session
        {
            $push: { //$push operator appends value to fits array data
                fits: {
                    exercise: req.body.exercise,
                    type: req.body.type,
                    location: req.body.location,
                    date: req.body.date,
                    calories: req.body.calories,
                    completed: req.body.completed,
                    description: req.body.description,
                },
            },
        },
        () => {
            res.redirect('/app');
        },
    );
});

// Show route using GET method to find id in currentuser 
routes.get('/:id', (req, res) => {
    User.find(
        { _id: req.session.currentUser._id },//find data in array and showarray
        {fits: { $elemMatch: { _id: req.params.id, }, }, },//matches documents in fits array to the id and params.id
        //render to show page with fit array 
        function (err, results) {
            res.render('app/show.ejs', {
                fit: results[0].fits[0],
            });
        },
    );
});



// Delete route
routes.delete('/:id', (req, res) => {
    User.findByIdAndUpdate( //find currentUser id and removes the elements and redirect to /app page
        { _id: req.session.currentUser._id },
        { $pull: { fits: { _id: req.params.id } } }, //$pull to remove existing fits array
        function (error, para) {
            if (error) {
                return res.json(error);
            } else {
                return res.redirect('/app');
            }
        },
    );
});


// Edit route using get method 
//use .fiond and elemMatch to match the array with the id object
routes.get('/:id/edit', (req, res) => {
    User.find(
        { _id: req.session.currentUser._id },
        { fits: { $elemMatch: { _id: req.params.id }, }, },//matches documents in fits array to the id and params.id
        { 'fits.$': 1 }, //$ operator to limit the content of fits array to only match the first elements
        function (error, user) {
            res.render('app/edit.ejs', { fit: user[0].fits[0], });
        },
    );
});

//Update route using PUT method
routes.put('/:id/update', (req, res) => {
    const userid = req.session.currentUser._id;
    const fitid = req.params.id;
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }
    User.updateOne(
        { _id: userid, 'fits._id': fitid },
        {
            // The $set operator replaces the value of a field with the specified value and redirects to app with paramsid
            $set: {
                'fits.$.exercise': req.body.exercise,
                'fits.$.type': req.body.type,
                'fits.$.location': req.body.location,
                'fits.$.date': req.body.date,
                'fits.$.calories': req.body.calories,
                'fits.$.completed': req.body.completed,
                'fits.$.description': req.body.description,
            },
        },
        (err, updatedFit) => {
            if (updatedFit) res.redirect('/app/' + req.params.id);
            else throw err;
        },
    );
});


module.exports = routes;