const { Card, validateCard } = require("../models/card");
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

const router = require("express").Router();

//get all
router.get("/", auth, async (req, res) => {
  const card = await Card.find().sort('cardName');

  return res.status(200).json(card);
});

//get card by id
router.get("/:cname", auth, async (req, res) => {
  const card = await Card.findOne({cardName: req.params.cname});

  if (!card) return res.status(400).json("No card found with given card name");

  return res.status(200).json(card);
});

//add new card
router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const card = new Card(req.body);

  await card.save();

  return res.status(201).json(card);
});

//edit card
router.put("/:_id", [auth, validateObjectId], async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const updatedCard = await Card.findByIdAndUpdate(req.params._id, req.body)

  return res.status(200).json(updatedCard);
});

//delete by id
router.delete("/:_id", [auth, validateObjectId], async (req, res) => {
  await Card.findByIdAndDelete(req.params._id);

  return res.status(200).json('Resource removed.');
});

module.exports = router;
