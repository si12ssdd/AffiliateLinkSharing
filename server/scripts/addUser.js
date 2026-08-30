const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('../src/models/User');

const seedUser = async () => {
    const email = process.argv[2] || 'admin@example.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existing = await Users.findOne({ email });
        if (existing) {
            console.log(`User ${email} already exists!`);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            email,
            password: hashedPassword,
            name,
            role: 'admin',
            credits: 100
        });

        console.log('✅ Admin user created successfully:');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        process.exit(0);
    } catch (err) {
        console.error('Error creating user:', err.message);
        process.exit(1);
    }
};

seedUser();