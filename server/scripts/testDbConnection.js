const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

console.log('Testing connection to:', uri.replace(/:([^:@]{1,})@/, ':****@')); // Hide password in logs

if (!uri) {
    console.error('Error: MONGO_URI is not defined in .env');
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => {
        console.log('✅ Successfully connected to MongoDB!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Connection failed:', err.message);
        if (err.codeName === 'AtlasError') {
            console.error('Hint: Check your username and password in MONGO_URI.');
            console.error('Hint: Make sure your IP address is whitelisted in MongoDB Atlas Network Access.');
        }
        process.exit(1);
    });
