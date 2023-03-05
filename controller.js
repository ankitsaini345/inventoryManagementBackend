const mongo = require('./mongoFunctions');
const objectId = require('mongodb').ObjectId;

const table = {
    orders: 'orders',
    cards: 'cards',
    transactions: 'transactions',
    payments: 'payments',
    payee: 'payee',
    users: 'users'
}

async function listDBRoute(req, res) {
    const result = await mongo.listDB();
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function getOrder(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.getOneRecord(table.orders, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function getDistictOrder(req, res) {
    const field = req.params.field
    const result = await mongo.getDistinctRecord(table.orders, field);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function getOrders(req, res) {
    const result = await mongo.getAllRecord(table.orders, {}, { date: -1 });
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addOrder(req, res) {
    const result = await mongo.insertOneRecord(table.orders, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function deleteOrder(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord(table.orders, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editOrder(req, res) {
    const query = { _id: req.params.id }
    console.log(query);
    const result = await mongo.updateRecord(table.orders, query, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function getCard(req, res) {
    const query = { cardName: req.params.name }
    const result = await mongo.getOneRecord(table.cards, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}
async function getCards(req, res) {
    const result = await mongo.getAllRecord(table.cards, {}, { cardName: 1 });
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addCard(req, res) {
    const result = await mongo.insertOneRecord(table.cards, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function deleteCard(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord(table.cards, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editCard(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.updateRecord(table.cards, query, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function getTxn(req, res) {
    let query;
    if (req.query.id) query = { _id: new objectId(req.query.id) }
    else if (req.params.cname) query = { cardName: req.params.cname }
    else return res.status(400).json({ error: true, msg: 'missing parameters' });

    const result = await mongo.getAllRecord(table.transactions, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}
async function getTxns(req, res) {
    const result = await mongo.getAllRecord(table.transactions, {}, { txnDate: -1 });
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addTxn(req, res) {
    const result = await mongo.insertOneRecord(table.transactions, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function deleteTxn(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord(table.transactions, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editTxn(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.updateRecord(table.transactions, query, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function getPayments(req, res) {
    const result = await mongo.getAllRecord(table.payments, {}, { date: -1 });
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addPayment(req, res) {
    const result = await mongo.insertOneRecord(table.payments, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function deletePayment(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord(table.payments, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editPayment(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.updateRecord(table.payments, query, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function getPayees(req, res) {
    const result = await mongo.getAllRecord(table.payee);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addPayee(req, res) {
    const result = await mongo.insertOneRecord(table.payee, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function deletePayee(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord(table.payee, query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editPayee(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.updateRecord(table.payee, query, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

module.exports = {
    listDBRoute,
    getOrder,
    getOrders,
    addOrder,
    getDistictOrder,
    deleteOrder,
    editOrder,
    getCard,
    getCards,
    editCard,
    deleteCard,
    addCard,
    getTxn,
    getTxns,
    addTxn,
    deleteTxn,
    editTxn,
    getPayments,
    addPayment,
    editPayment,
    deletePayment,
    getPayees,
    addPayee,
    editPayee,
    deletePayee
}