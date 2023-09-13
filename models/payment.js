const mongoose = require("mongoose");
const Joi = require("joi");

function validatePayment(payment) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().required(),
    amount: Joi.number().required(),
    cashback: Joi.number(),
    count: Joi.number().required(),
    date: Joi.date().required(),
    lastPayDate: Joi.date(),
    paymentMode: Joi.string().required(),
    pendingCommision: Joi.number(),
    percent: Joi.number(),
    prevAmount: Joi.number(),
    receiver: Joi.string(),
    remAmount: Joi.number(),
    remark: Joi.string(),
    type: Joi.string(),
  });

  return schema.validate(payment);
}

const paymentSchema = mongoose.Schema({
  name: String,
  amount: Number,
  cashback: Number,
  count: Number,
  date: Date,
  lastPayDate: Date,
  paymentMode: String,
  pendingCommision: Number,
  percent: Number,
  prevAmount: Number,
  receiver: String,
  remAmount: Number,
  remark: String,
  type: String,
});

const Payment = mongoose.model("payment", paymentSchema);

module.exports = {
  Payment,
  validatePayment,
};
