const mongoose = require("mongoose");
const Joi = require("joi");

function validateOrder(order) {
    const schema = Joi.object({
        _id: Joi.objectId(),
        name: Joi.string().required(),
        date: Joi.date().required(),
        ram: Joi.number().required(),
        storage: Joi.number().required(),
        appName: Joi.string().required(),
        status: Joi.string().required(),
        listPrice: Joi.number().required(),
        cardAmount: Joi.number().required(),
        costToMe: Joi.number().required(),
        buyerPrice: Joi.number(),
        coupon: Joi.number(),
        giftBalence: Joi.number(),
        cardDiscount: Joi.number(),
        cardHolder: Joi.string().required(),
        deliveryDate: Joi.date(),
        deliveryLoc: Joi.string(),
        buyerDate: Joi.date(),
        buyerName: Joi.string(),
        profit: Joi.number(),
        txnId: Joi.objectId().required(),
        cashback: Joi.number(),
        delivery: Joi.number(),
        cardDiscount: Joi.number(),
    });

    return schema.validate(order);
}

const orderSchema = mongoose.Schema({
    name: String,
    date: Date,
    ram: Number,
    storage: Number,
    appName: String,
    status: String,
    listPrice: Number,
    cardAmount: Number,
    costToMe: Number,
    buyerPrice: Number,
    coupon: Number,
    giftBalence: Number,
    cardDiscount: Number,
    cardHolder: String,
    deliveryDate: Date,
    deliveryLoc: String,
    buyerDate: Date,
    buyerName: String,
    profit: Number,
    txnId: String,
    cashback: Number,
    delivery: Number,
    cardDiscount: Number,
});

const Order = mongoose.model("orders", orderSchema);

module.exports = {
  Order,
  validateOrder,
};
