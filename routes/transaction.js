const { Transaction, validateTransaction } = require("../models/transaction");
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

const router = require("express").Router();

//get all
router.get("/", [auth], async (req, res) => {
  const transaction = await Transaction.find().sort({ _id: -1 });

  return res.status(200).json(transaction);
});

//get transaction by card name
router.get("/cname", auth, async (req, res) => {
  const transaction = await Transaction.findOne({cardName: req.params.cname});

  if (!transaction) return res.status(400).json("No transaction found with given card name");

  return res.status(200).json(transaction);
});

//add new transaction
router.post("/", auth, async (req, res) => {
  const { error } = validateTransaction(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const transaction = new Transaction(req.body);

  await transaction.save();

  return res.status(201).json(transaction);
});

//edit transaction
router.put("/:_id", [auth, validateObjectId], async (req, res) => {
  const { error } = validateTransaction(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params._id, req.body)

  return res.status(200).json(updatedTransaction);
});

//delete by id
router.delete("/:_id", [auth, validateObjectId], async (req, res) => {
  await Transaction.findByIdAndDelete(req.params._id);

  return res.status(200).json('Resource removed.');
});

module.exports = router;
