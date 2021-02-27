const express = require('express');
const  Mongoose  = require('mongoose');
const  update  = require('../models/users.js');
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

// new route - new workout form
router.get('/new', (req, res) => {
    res.render('app/new.ejs');
});

// create route - adding new workout to a user's db
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
                    img: req.body.img,
                    calories: req.body.calories,
                    completed: req.body.completed,
                },
            },
        },
        (error, newFit) => {
            res.redirect('/app');
        },
    );
});

// index route - fits user's main page
router.get('/', isAuthenticated, (req, res) => {
    // finds all users
    User.findById({ _id: req.session.currentUser._id }, (err, currentUser) => {
        // renders the dashboard
        res.render('app/index.ejs', {
            currentUser: currentUser,
        });
    });
});

// show route
router.get('/:id', (req, res) => {
    //console.log(req.session.currentUser._id);
    //console.log(req.params._id);
    User.find(
        { _id: req.session.currentUser._id },
        {
            fits: {
                $elemMatch: {
                    _id: req.params.id,
                },
            },
        },
        {
            'fits.$': 1,
        },
        function (err, results) {
            // console.log(results[0].fits[0]);
            res.render('app/show.ejs', {
                fit: results[0].fits[0],
            });
        },
    );
});

// delete route
router.delete('/:id', (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.session.currentUser._id },
        { $pull: { fits: { _id: req.params.id } } },
        { new: true },
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
    // console.log(req.session.currentUser._id);
    User.find(
        { _id: req.session.currentUser._id },
        {
            fits: {
                $elemMatch: { _id: req.params.id },
            },
        },
        { 'fits.$': 1 },
        function (error, user) {
            //console.log(user[0].fits[0]);
            res.render('app/edit.ejs', {
                fit: user[0].fits[0],
            });
        },
    );
});

// put route - update
router.put('/:id', (req, res) => {
    const catFromForm = req.body.location;
    const location = catFromForm.split(',');
    const userID = req.session.currentUser._id;
    const fitID = req.params.id;
    // console.log('this is res.params.id ' + req.params.id);
    // console.log('this is user object id ' + req.session.currentUser._id);
    if (req.body.completed === 'on') {
        req.body.completed = true;
    }
    User.updateOne(
        { _id: userID, 'fits._id': fitID },
        {
            $set: {
                'fits.$.exercise': req.body.exercise,
                'fits.$.type': req.body.type,
                'fits.$.location': location,
                'fits.$.date': req.body.date,
                'fits.$.img': req.body.img,
                'fits.$.calories': req.body.calories,
                'fits.$.completed': req.body.completed,
                'fits.$.description': req.body.description,

            },
        },
        { new: true },
        (err, updatedFit) => {
        
            res.redirect('/app/' + req.params.id);
        },
    );
});

router.put('/:id', (req, res) => {});

module.exports = router;