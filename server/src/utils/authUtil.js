const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const attemptToRefreshToken = async (refreshToken) =>{
    try{
        const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
        const secret = process.env.JWT_SECRET;

        if (!refreshSecret || !secret) {
            throw new Error('JWT secrets are not configured in environment variables');
        }

        const decoded = jwt.verify(refreshToken, refreshSecret);
        const data = await Users.findById(decoded.id);
        if (!data) {
            throw new Error('User not found');
        }

        const user = {
            id: data._id,
            username: data.email,
            name: data.name,
            role: data.role? data.role : 'admin',
            credits: data.credits,
            subscription: data.subscription
        };

        const newAccessToken = jwt.sign(user, secret, { expiresIn: '1h'});

        return {newAccessToken, user};
    }catch(error){
        console.error('Refresh token error:', error.message || error);
        throw error;
    }
}

module.exports = { attemptToRefreshToken }