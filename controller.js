const mongo = require('./mongoFunctions');
const objectId = require('mongodb').ObjectId;

async function listDBRoute(req, res) {
    const result = await mongo.listDB();
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function getOrder(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.getOneRecord('orders', query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function getDistictOrder(req, res) {
    const field = req.params.field
    const result = await mongo.getDistinctRecord('orders', field);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function getOrders(req, res) {
    const result = await mongo.getAllRecord('orders');
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addOrder(req, res) {
    const result = await mongo.insertOneRecord('orders', req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function deleteOrder(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord('orders', query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editOrder(req, res) {
    const query = { _id: req.params.id }
    console.log(query);
    const result = await mongo.updateRecord('orders', query, req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function getCard(req, res) {
    const query = { cardName: req.params.name }
    const result = await mongo.getOneRecord('cards', query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}
async function getCards(req, res) {
    const result = await mongo.getAllRecord('cards');
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addCard(req, res) {
    const result = await mongo.insertOneRecord('cards', req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function deleteCard(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord('cards', query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editCard(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.updateRecord('cards', query, req.body);
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

    const result = await mongo.getAllRecord('transactions', query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}
async function getTxns(req, res) {
    const result = await mongo.getAllRecord('transactions');
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(200).json(result)
}

async function addTxn(req, res) {
    const result = await mongo.insertOneRecord('transactions', req.body);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(201).json(result)
}

async function deleteTxn(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.deleteOneRecord('transactions', query);
    if (!result) return res.json({});
    if (result.error) {
        return res.status(500).json(result);
    } else return res.status(202).json(result)
}

async function editTxn(req, res) {
    const query = { _id: req.params.id }
    const result = await mongo.updateRecord('transactions', query, req.body);
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
    editTxn
}