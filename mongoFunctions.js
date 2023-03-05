const { MongoClient } = require('mongodb');
const config = require('./config/config');

const connectionString = config.mongo.uriString;
const dbName = config.mongo.dbName;

async function listDB() {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const databasesList = await client.db().admin().listDatabases();
        return databasesList;
    } catch (err) {
        console.log('Error in listDB', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function getOneRecord(table, query = {}) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const data = await client.db(dbName).collection(table).findOne(query);
        // console.log(data);
        return data;
    } catch (err) {
        console.log('Error in getOneRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function getAllRecord(table, query = {}, sortQuery) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        let data;
        if (sortQuery) {
            data = await client.db(dbName).collection(table).find(query, { returnDocument: 'after' }).sort(sortQuery).toArray();
        }
        else {
            data = await client.db(dbName).collection(table).find(query, { returnDocument: 'after' }).toArray();
        }
        // console.log(data);
        return data;
    } catch (err) {
        console.log('Error in getAllRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function getDistinctRecord(table, field, query = {}) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const data = await client.db(dbName).collection(table).distinct(field);
        // console.log(data);
        return data;
    } catch (err) {
        console.log('Error in getDistinctRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function insertOneRecord(table, data) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const res = await client.db(dbName).collection(table).insertOne(data);
        console.log(res);
        return res;
    } catch (err) {
        console.log('Error in insertOneRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function insertMultipleRecord(table, data) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const res = await client.db(dbName).collection(table).insertMany(data);
        // console.log(res);
        return res;
    } catch (err) {
        console.log('Error in insertMultipleRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function deleteOneRecord(table, query) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const res = await client.db(dbName).collection(table).deleteOne(query)
        console.log(res);
        return res;
    } catch (err) {
        console.log('Error in deleteOneRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function deleteMultipleRecord(table, query) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const res = await client.db(dbName).collection(table).deleteMany(query);
        // console.log(res);
        return res;
    } catch (err) {
        console.log('Error in deleteMultipleRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

async function updateRecord(table, recordToUpdate, updatedValue) {
    let client = new MongoClient(connectionString);
    try {
        client = await client.connect();
        const res = await client.db(dbName).collection(table).updateOne(recordToUpdate, { $set: updatedValue }, { upsert: true });
        // console.log(res);
        return res;
    } catch (err) {
        console.log('Error in updateRecord', err);
        return { error: true, msg: err.message }
    }
    finally { await client.close(); }
};

module.exports = {
    listDB,
    getAllRecord,
    getOneRecord,
    getDistinctRecord,
    insertOneRecord,
    insertMultipleRecord,
    deleteOneRecord,
    deleteMultipleRecord,
    updateRecord
}