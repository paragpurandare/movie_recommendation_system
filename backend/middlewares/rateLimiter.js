const ratelimit = require('../config/upstash');

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later",
            });
        }

        next();
    } catch (error) {
        console.log("Rate limit error", error);
        // If rate limiter fails (e.g., Upstash unavailable), allow request through
        // This prevents the entire service from crashing
        next();
    }
};

module.exports = rateLimiter;