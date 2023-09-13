
module.exports = function(req, res, next) {
    if(req.user && req.user.roles && req.user.roles.length && req.user.roles.includes('admin')) {
        next();
    } else return res.status(403).json('Requested Action need Admin Role.')
}