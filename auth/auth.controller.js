const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getOneRecord, insertOneRecord } = require('../mongoFunctions');
const config = require("../config/config");

async function login(req, res) {
    const { userId, password } = req.body;

    if (!userId || !password) return res.status(400).json({
        error: true,
        message: 'Bad Request!! Missing UserId or Password.'
    });

    let payload = await getOneRecord('users', { userId });

    if (!payload) return res.status(400).json({
        error: true,
        message: 'User not found!!.'
    });

    const validPassword = bcrypt.compareSync(password, payload.password);

    if (!validPassword) return res.status(401).json({
        error: true,
        message: 'Invalid Password!!'
    });

    delete payload.password;

    const authToken = jwt.sign({ id: payload.userId }, config.jwt.secret, {
        expiresIn: config.jwt.expiry
    });

    return res.status(200).json({
        error: false,
        ...payload,
        authToken
    });
}

async function signup(req, res) {
    const { userId, password } = req.body;

    if (!userId || !password) return res.status(400).json({
        error: true,
        message: 'Bad Request!! Missing UserId or Password.'
    });

    let data = await getOneRecord('users', { userId });
    if (data) return res.status(400).json({
        error: true,
        message: 'User already exist.'
    });

    const EncryptedPassword = bcrypt.hashSync(password, 8)
    const result = await insertOneRecord('users', { userId, password: EncryptedPassword });
    console.log('signup', result);
    if (result.error) return res.status(500).json({
        error: true,
        message: 'Bad Request!! Missing UserId or Password.'
    });
    else return res.status(200).json({
        error: false,
        ...result
    })
}

function verifyToken(req, res, next) {
    const token = req.headers['Authorization'];

    if (!token) return res.status(400).json({
        error: true,
        message: 'Bad Request!! Missing Auth token header.'
    });

    try {
        const payload = jwt.verify(token, config.jwt.secret)
        req.body.userId = payload.userId;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) return res.status(401).json({
            error: true,
            message: err.message,
            expiredToken: true,
        });
        else if (err instanceof jwt.JsonWebTokenError) return res.status(401).json({
            error: true,
            message: err.message
        });
        else return res.status(500).json({
            error: true,
            message: err.message
        });
    }
}

function refreshToken(req, res) {
    const token = req.headers['Authorization'];

    if (!token) return res.status(400).json({
        error: true,
        message: 'Bad Request!! Missing Auth token header.'
    });

    try {
        let payload = jwt.decode(token, config.jwt.secret);
        delete payload.iat;
        delete payload.exp;
        const newToken = jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiry
        });
        return res.status(200).json({
            error: false,
            ...payload,
            newToken
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) return res.status(401).json({
            error: true,
            message: err.message
        });
        else return res.status(500).json({
            error: true,
            message: err.message
        });
    }
}

module.exports = {
    login,
    signup,
    verifyToken,
    refreshToken
}
