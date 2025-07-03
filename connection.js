const mongoose = require('mongoose');

async function connectToDatabase(url) {
    return mongoose.connect(url).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    })
}

module.exports = {connectToDatabase};