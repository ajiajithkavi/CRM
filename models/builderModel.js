const mongoose = require('mongoose');

const builderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },

    contactInfo: {
        phone: String,
        email: String,
        address: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('builder', builderSchema);