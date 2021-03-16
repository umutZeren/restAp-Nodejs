const mongo = require('mongoose');

const userSchema = mongo.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname:
    {
        type: String,
        required: true
    }
});

// when imported with 'required ' first parameter "collection1" describes collection name scheme targeted.
// "userSchema" reference to schema that we described above as an object of mongoose Schema

module.exports = mongo.model('collection1', userSchema);
