const { Payment, validatePayment } = require("../models/payment");
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

const router = require("express").Router();

//get all
router.get("/", [auth], async (req, res) => {
  const payment = await Payment.find().sort({ _id: -1 });

  return res.status(200).json(payment);
});

//get payment by id
router.get("/:_id", [auth, validateObjectId], async (req, res) => {
  const payment = await Payment.findById(req.params._id);

  if (!payment) return res.status(400).json("No payment found with given id");

  return res.status(200).json(payment);
});

//add new payment
router.post("/", auth, async (req, res) => {
  const { error } = validatePayment(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const payment = new Payment(req.body);

  await payment.save();

  return res.status(201).json(payment);
});

//edit payment
router.put("/:_id", [auth, validateObjectId], async (req, res) => {
  const { error } = validatePayment(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const updatedPayment = await Payment.findByIdAndUpdate(req.params._id, req.body)

  return res.status(200).json(updatedPayment);
});

//delete by id
router.delete("/:_id", [auth, validateObjectId], async (req, res) => {
  await Payment.findByIdAndDelete(req.params._id);

  return res.status(200).json('Resource removed.');
});

module.exports = router;
