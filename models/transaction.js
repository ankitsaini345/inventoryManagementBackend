const mongoose = require("mongoose");
const Joi = require("joi");

function validateTransaction(transaction) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    amount: Joi.number().required(),
    orderId: Joi.objectId().required(),
    txnDate: Joi.date().required(),
    cardName: Joi.string(),
    orderName: Joi.string().required(),
  });

  return schema.validate(transaction);
}

const transactionSchema = mongoose.Schema({
    amount: Number,
    orderId: String,
    txnDate: Date,
    cardName: String,
    orderName: String
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = {
  Transaction,
  validateTransaction,
};
