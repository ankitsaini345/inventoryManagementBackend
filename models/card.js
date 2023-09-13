const mongoose = require("mongoose");
const Joi = require("joi");

function validateCard(card) {
    const schema = Joi.object({
        _id: Joi.objectId(),
        cardName: Joi.string().required(),
        cardNumber: Joi.number().required(),
        dueDate: Joi.number(),
        billDate: Joi.number(),
        amountDue: Joi.number(),
        totalAmount: Joi.number(),
        unbilledAmount: Joi.number(),
        lastBilledMonth: Joi.number(),
        cashback: Joi.number(),
        limit: Joi.number(),
    });

    return schema.validate(card);
}

const cardSchema = mongoose.Schema({
  cardName: String,
  dueDate: {
    type: Number,
    default: 0,
  },
  amountDue: {
    type: Number,
    default: 0,
  },
  billDate: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  cardNumber: Number,
  unbilledAmount: {
    type: Number,
    default: 0,
  },
  lastBilledMonth: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 0,
  },
  cashback: {
    type: Number,
    default: 0,
  },
});

const Card = mongoose.model("cards", cardSchema);

module.exports = {
  Card,
  validateCard,
};
