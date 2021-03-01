const  Mongoose  = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//MIDDLEWARE
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/sessions/new');
    }
};

// new workout
router.get('/new', (req, res) => {
    res.render('app/new.ejs');
});


// Homepage
router.get('/', isAuthenticated, (req, res) => {
    // finds all users
    User.findById({ _id: req.session.currentUser._id }, (err, currentUser) => {
        res.render('app/index.ejs', {
            currentUser: currentUser,
        });
    });
});

// create route
router.post('/', (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }
    User.findOneAndUpdate(
        { _id: req.session.currentUser._id },
        {
            $push: {
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
        (error, newFit) => {
            res.redirect('/app');
        },
    );
});


// show route
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
    User.findByIdAndUpdate(
        { _id: req.session.currentUser._id },
        { $pull: { fits: { _id: req.params.id } } },
        function (error, model) {
            if (error) {
                return res.json(error);
            } else {
                return res.redirect('/app');
            }
        },
    );
});

// edit route
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

//put route
router.put('/:id/update', (req, res) => {
    const locate = req.body.location;
    const userID = req.session.currentUser._id;
    const fitID = req.params.id;
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }
    User.updateOne(
        { _id: userID, 'fits._id': fitID },
        {
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
        { new: true },
        (err, updatedFit) => {
            if (updatedFit) res.redirect('/app/' + req.params.id);
            else throw err;            
        },
    );
});


module.exports = router;