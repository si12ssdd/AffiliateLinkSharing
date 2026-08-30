const jwt = require('jsonwebtoken');
const { attemptToRefreshToken } = require('../utils/authUtil');

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const getCookieOptions = () => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    path: '/'
});

const authMiddleware = {
    protect: async (request, response, next) => {
        try {
            const token = request.cookies?.jwtToken;
            if (!token) {
                return response.status(401).json({
                    error: 'Unauthorized access'
                });
            }

            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                request.user = user;
                return next();
            } catch (error) {
                const refreshToken = request.cookies?.refreshToken;
                if (refreshToken) {
                    try {
                        const { newAccessToken, user } =
                            await attemptToRefreshToken(refreshToken);
                        response.cookie('jwtToken', newAccessToken, getCookieOptions());
                        request.user = user;
                        return next();
                    } catch (refreshErr) {
                        return response.status(401).json({
                            error: 'Unauthorized access'
                        });
                    }
                }
                return response.status(401).json({
                    error: 'Unauthorized access'
                });
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: 'Internal server error'
            });
        }
    },
};

module.exports = authMiddleware;