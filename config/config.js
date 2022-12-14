require('dotenv').config();

const config = {
    port: 3000,
    baseUrl: '/api',
    mongo: {
        uriString: process.env.MONGO_URI,
        dbName: 'inventory'
    }
}

module.exports = config;