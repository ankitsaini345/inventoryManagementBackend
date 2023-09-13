const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    const _id = req.params._id;
    if(!_id) return res.status(400).json('_id parameter missing in request')

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json('_id parameter is not valid object id.')

    next();
}