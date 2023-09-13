const mongoose = require("mongoose");
const Joi = require("joi");

function validatePayee(payee) {
    const schema = Joi.object({
        _id: Joi.objectId(),
        name: Joi.string().required(),
        lastPaymentDate: Joi.date().required(),
        totalAmount: Joi.number(),
        pendingComm: Joi.number(),
        lastPaymentNum: Joi.number().required(),
        lastPaidAmount: Joi.number(),
        tillDate: Joi.number(),
    });

    return schema.validate(payee);
}

const payeeSchema = mongoose.Schema({
    name: String,
    lastPaymentDate: Date,
    totalAmount: Number,
    pendingComm: Number,
    lastPaymentNum: Number,
    lastPaidAmount: Number,
    tillDate: Number,
});

const Payee = mongoose.model("payee", payeeSchema);

module.exports = {
  Payee,
  validatePayee,
};
