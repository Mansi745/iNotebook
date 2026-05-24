const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true   // 👈 fixed
    },
    password: {
        type: String,
       // 👈 fixed
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    email: {
        type: String,
        required: true,  // 👈 fixed
        unique: true
    },
});

module.exports = mongoose.model('User', UserSchema);
