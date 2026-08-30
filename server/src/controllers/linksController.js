const Links = require("../models/Link");
const Users = require("../models/User");
const axios = require('axios');
const { getDeviceInfo } = require("../utils/linkUtil");
const Clicks = require("../models/Click");
const { generateUploadSignature } = require("../services/cloudinaryService");

const linksController = {
    create: async (request, response) => {
        
        const { campaign_title, original_url, category,  thumbnail  } = request.body;

        try {
            const user = await Users.findById(request.user.id);

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            const hasActiveSubscription = user.subscription &&
                user.subscription.status === 'active';

            if (!hasActiveSubscription && user.credits < 1) {
                return response.status(400).json({
                    message: 'Insufficient credit balance or no active subscription'
                });
            }

            const link = new Links({
                campaignTitle: campaign_title,
                originalUrl: original_url,
                category: category,
                thumbnail: thumbnail,
                user: request.user.role === 'admin' ?
                    request.user.id : request.user.adminId
            });
            await link.save();

            if (!hasActiveSubscription) {
                user.credits -= 1;
                await user.save();
            }

            response.json({
                data: { linkId: link._id }
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: 'Internal server error'
            });
        }
    },

    getAll: async (request, response) => {
        try {
            const {
                currentPage = 0, pageSize = 10,
                searchQuery = '',
                sortfield = 'createdAt', sortOrder = 'desc'
            } = request.query;

            const userId = request.user.role === 'admin' ?
                request.user.id : request.user.adminId;

            const skip = parseInt(currentPage) * parseInt(pageSize);
            const limit = parseInt(pageSize);
            const sort = { [sortfield]: sortOrder === 'desc' ? -1 : 1 };

            const query = {
                user: userId
            };

            if (searchQuery) {
                query.$or = [
                    { campaignTitle: new RegExp(searchQuery, 'i') },
                    { originalUrl: new RegExp(searchQuery, 'i') },
                    { category: new RegExp(searchQuery, 'i') },
                ];
            }

            const links = await Links
                .find(query)
                .sort(sort).skip(skip).limit(limit);
            const total = await Links.countDocuments(query);
            response.json({ links, total });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: 'Internal server error'
            });
        }
    },

    getById: async (request, response) => {
        try {
            const linkId = request.params.id;
            if (!linkId) {
                return response.status(401)
                    .json({ error: 'Link ID is required' });
            }

            const link = await Links.findById(linkId);
            if (!link) {
                return response.status(404)
                    .json({ error: 'LinkID does not exist' });
            }

            const userId = request.user.role === 'admin' ?
                request.user.id : request.user.adminId;
            if (link.user.toString() !== userId) {
                return response.status(403).json({
                    error: 'Unauthorized access'
                });
            }

            response.json({ data: link });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: 'Internal server error'
            });
        }
    },

    update: async (request, response) => {
        try {
            const linkId = request.params.id;
            if (!linkId) {
                return response.status(401)
                    .json({ error: 'Link ID is required' });
            }

            let link = await Links.findById(linkId);
            if (!link) {
                return response.status(404)
                    .json({ error: 'LinkID does not exist' });
            }

            const userId = request.user.role === 'admin' ?
                request.user.id : request.user.adminId;
            if (link.user.toString() !== userId) {
                return response.status(403).json({
                    error: 'Unauthorized access'
                });
            }


            const { campaign_title, original_url, category, thumbnail } = request.body;
            link = await Links.findByIdAndUpdate(linkId, {
                campaignTitle: campaign_title,
                originalUrl: original_url,
                category: category,
                 thumbnail: thumbnail,
            }, { new: true });
             // new: true flag makes sure mongodb returns updated data after the update operation

            response.json({ data: link });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: 'Internal server error'
            });
        }
    },

    delete: async (request, response) => {
        try {
            const linkId = request.params.id;
            if (!linkId) {
                return response.status(401)
                    .json({ error: 'Link ID is required' });
            }

            let link = await Links.findById(linkId);
            if (!link) {
                return response.status(404)
                    .json({ error: 'LinkID does not exist' });
            }

            const userId = request.user.role === 'admin' ?
                request.user.id : request.user.adminId;
            if (link.user.toString() !== userId) {
                return response.status(403).json({
                    error: 'Unauthorized access'
                });
            }

            await link.deleteOne();
            response.json({ message: 'Link deleted' });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: 'Internal server error'
            });
        }
    },

    redirect: async (request, response) => {
        try {
            const linkId = request.params.id;
            if (!linkId) {
                return response.status(401)
                    .json({ error: 'Link ID is required' });
            }

            let link = await Links.findById(linkId);
            if (!link) {
                return response.status(404)
                    .json({ error: 'LinkID does not exist' });
            }

            const isDevelopment = process.env.NODE_ENV === 'development';
            const ipAddress = isDevelopment
                ? '8.8.8.8'
                : request.headers['x-forwarded-for']?.split(',')[0]
                || request.socket.remoteAddress;

            let city, country, region, lat, lon, isp;
            try {
                const geoResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`, { timeout: 3000 });
                if (geoResponse.data && geoResponse.data.status !== 'fail') {
                    city = geoResponse.data.city;
                    country = geoResponse.data.country;
                    region = geoResponse.data.region;
                    lat = geoResponse.data.lat;
                    lon = geoResponse.data.lon;
                    isp = geoResponse.data.isp;
                }
            } catch (geoErr) {
                console.log('Geo lookup failed (continuing redirect):', geoErr.message);
            }

            const userAgent = request.headers['user-agent'] || 'unknown';
            const { isMobile, browser } = getDeviceInfo(userAgent);
            const deviceType = isMobile ? 'Mobile' : 'Desktop';

            const referrer = request.get('Referrer') || null;

            try {
                await Clicks.create({
                    linkId: link._id,
                    ip: ipAddress,
                    city: city,
                    country: country,
                    region: region,
                    latitude: lat,
                    longitude: lon,
                    isp: isp,
                    referrer: referrer,
                    userAgent: userAgent,
                    deviceType: deviceType,
                    browser: browser,
                    clickedAt: new Date()
                });

                link.clickCount = (link.clickCount || 0) + 1;
                await link.save();
            } catch (clickErr) {
                console.log('Error saving click record:', clickErr.message);
            }

            return response.redirect(link.originalUrl);
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: 'Internal server error'
            });
        }
    },

    analytics: async (request, response) => {
        try {
            const { linkId, from, to } = request.query;

            const link = await Links.findById(linkId);
            if (!link) {
                return response.status(404).json({
                    error: 'Link not found'
                });
            }

            const userId = request.user.role === 'admin'
                ? request.user.id
                : request.user.adminId;
            if (link.user.toString() !== userId) {
                return response.status(403).json({
                    error: 'Unauthorized'
                });
            }

            const query = {
                linkId: linkId
            };

            if (from && to) {
                query.clickedAt = { $gte: new Date(from), $lte: new Date(to) };
            }

            const data = await Clicks.find(query).sort({ clickedAt: -1 });
            response.json(data);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Internal server error'
            });
        }
    },

    createUploadSignature: async (request, response) => {
        try {
            const { signature, timestamp } = generateUploadSignature();
            response.json({
                signature: signature,
                timestamp: timestamp,
                apikey: process.env.CLOUDINARY_API_KEY,
                cloudName: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME
            });
        } catch (error) {
            response.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = linksController;
