const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        
        fits: [
            {
                exercise: {type: String},
                type: {type: String },
                location: {type: String },
                date: {type: Date, default:Date.now },
                calories: {type: Number, min: 1},
                completed: { type: Boolean, default: false },
                description: { type: String },
            },
        ],
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;