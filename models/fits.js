const mongoose = require('mongoose');

const fitSchema = new mongoose.Schema({
    exercise: {type: String},
    type: {type: String },
    location: {type: String },
    date: {type: Date },
    img: {type: String },
    calories: {type: Number, min: 1},
    completed: { type: Boolean, default: false },
    description: { type: String },
});

const Fits = mongoose.model('Fit',fitSchema);

module.exports = Fits;