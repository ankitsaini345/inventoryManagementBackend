const express = require('express')
const cors = require('cors')
const path = require('path')
const config = require('./config/config')
const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).send('Application is Running!');
})

app.use(config.baseUrl, routes);

// app.use(express.static(path.join(__dirname, 'frontend', 'dist', 'inventory-management')));

// app.all('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'inventory-management', 'index.html'))
// });

const port = config.port || 4000;
app.listen(port, (err) => {
    if (err) console.log('Error in Running Server: ' + err);
    console.log('Application is running at port: ' + port);
})