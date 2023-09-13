const { Payee, validatePayee } = require("../models/payee");
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

const router = require("express").Router();

//get all
router.get("/", [auth], async (req, res) => {
  const payees = await Payee.find().sort({ _id: -1 });

  return res.status(200).json(payees);
});

//get payee by id
router.get("/:_id", [auth, validateObjectId], async (req, res) => {
  const payee = await Payee.findById(req.params._id);

  if (!payee) return res.status(400).json("No payee found with given id");

  return res.status(200).json(payee);
});

//add new payee
router.post("/", auth, async (req, res) => {
  const { error } = validatePayee(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const payee = new Payee(req.body);

  await payee.save();

  return res.status(201).json(payee);
});

//edit payee
router.put("/:_id", [auth, validateObjectId], async (req, res) => {
  const { error } = validatePayee(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const updatedPayee = await Payee.findByIdAndUpdate(req.params._id, req.body)

  return res.status(200).json(updatedPayee);
});

//delete by id
router.delete("/:_id", [auth, validateObjectId], async (req, res) => {
  await Payee.findByIdAndDelete(req.params._id);

  return res.status(200).json('Resource removed.');
});

module.exports = router;
