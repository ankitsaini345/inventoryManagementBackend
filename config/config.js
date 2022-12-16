require('dotenv').config();

const config = {
    port: 3000,
    baseUrl: '/api',
    mongo: {
        uriString: process.env.MONGO_URI,
        dbName: 'inventory'
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiry: 86400 // 24 hours
    }
}

module.exports = config;