const express = require('express');
const cors = require('cors')
const morgan = require('morgan');

const auth = require('../routes/auth');
const cards = require('../routes/card');
const orders = require('../routes/order');
const payees = require('../routes/payee');
const payments = require('../routes/payment');
const transactions = require('../routes/transaction');

module.exports = function(app) {

    app.use(morgan('tiny'));
    app.use(express.json());
    app.use(cors());
    app.use('/api', auth);
    app.use('/api/orders', orders);
    app.use('/api/cards', cards);
    app.use('/api/payees', payees);
    app.use('/api/payments', payments);
    app.use('/api/txns', transactions);
}