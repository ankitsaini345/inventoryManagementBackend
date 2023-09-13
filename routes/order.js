const { Order, validateOrder } = require("../models/order");
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

const router = require("express").Router();

//get all orders
router.get("/", auth, async (req, res) => {
  const orders = await Order.find().sort({ _id: -1 });

  return res.status(200).json(orders);
});

//get order by id
router.get("/:_id", [auth, validateObjectId], async (req, res) => {
  const order = await Order.findById(req.params._id);

  if (!order) return res.status(400).json("No order found with given id");

  return res.status(200).json(order);
});

//add new order
router.post("/", auth, async (req, res) => {
  const { error } = validateOrder(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const order = new Order(req.body);

  await order.save();

  return res.status(201).json(order);
});

//edit order
router.put("/:_id", [auth, validateObjectId], async (req, res) => {
    // const order = await Order.findById(req.params._id);
    // if (!order) return res.status(400).json("No order found with given id");

  const { error } = validateOrder(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const updatedOrder = await Order.findByIdAndUpdate(req.params._id, req.body)

  return res.status(200).json(updatedOrder);
});

//delete by id
router.delete("/:_id", [auth, validateObjectId], async (req, res) => {
  await Order.findByIdAndDelete(req.params._id);

  return res.status(200).json('Resource removed.');
});

module.exports = router;
