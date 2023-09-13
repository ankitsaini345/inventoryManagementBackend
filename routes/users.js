const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { User } = require('../models/user');

const router = require('express').Router();

router.get('/', [auth, admin], async (req, res) => {
    const users = await User.find().select('name email roles active');

    return res.status(200).json(users)
}
)

router.get('/:_id', [auth, validateObjectId], async (req, res) => {

    const users = await User.findById(req.params._id).select('name email roles active');

    return res.status(200).json(users)
})