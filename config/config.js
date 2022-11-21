const config = {
    port: 3000,
    baseUrl: '/api',
    mongo: {
        uriString: 'mongodb+srv://mongouser1:mongouser1@cluster0.5eykrdz.mongodb.net/?retryWrites=true&w=majority',
        dbName: 'inventory'
    }
}

module.exports = config;