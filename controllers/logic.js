const  Mongoose  = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//MIDDLEWARE
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) { //if its currentUser from current session return next
        return next();
    } else {
        res.redirect('/sessions/new');
    }
};

// GET new workout
router.get('/new', (req, res) => {
    res.render('app/new.ejs');
});


// GET Homepage
router.get('/', isAuthenticated, (req, res) => {
    User.findById({ _id: req.session.currentUser._id }, (err, currentUser) => { //find current user by ID
        res.render('app/index.ejs', {
            currentUser: currentUser,
        });
    });
});

// POST create route
router.post('/', (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }
    User.findOneAndUpdate(
        { _id: req.session.currentUser._id },//find currentUser and push fits data into the currentUser session
        {
            $push: { //$push in the fits array data
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
        (err, newFits) => {
            res.redirect('/app');
        },
    );
});

// GET show route
router.get('/:id', (req, res) => {
    User.find(
        { _id: req.session.currentUser._id },
        {
            fits: {
                $elemMatch: {
                    _id: req.params.id,
                },
            },
        },
        function (err, results) {
            res.render('app/show.ejs', {
                fit: results[0].fits[0],
            });
        },
    );
});




// Delete route
router.delete('/:id', (req, res) => {
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



// GET edit route
router.get('/:id/edit', (req, res) => {
    User.find(
        { _id: req.session.currentUser._id },
        {
            fits: {
                $elemMatch: { _id: req.params.id },
            },
        },
        { 'fits.$': 1 },
        function (error, user) {
            res.render('app/edit.ejs', {
                fit: user[0].fits[0],
            });
        },
    );
});

//GET put route
router.put('/:id/update', (req, res) => {
    const userID = req.session.currentUser._id;
    const fitID = req.params.id;
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }
    User.updateOne(
        { _id: userID, 'fits._id': fitID },
        {
            // The $set operator replaces the value of a field with the specified value.
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


module.exports = router;