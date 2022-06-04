const jwt = require('jsonwebtoken');
const { getUserIdByEmail } = require('../routes/user/user.query');

async function auth(req, res, next) {
    let decoded;
    const token = req.headers.authorization;

    try {
        decoded = jwt.verify(token, process.env.SECRET);
    } catch(err) {
        return res.status(498).json({ 'msg': 'Token is not valid' });
    }
    const userId = await getUserIdByEmail(decoded.email);
    if (userId === false) {
        return res.status(404).json({ 'msg': 'Not found' });
    }
    req.userId = userId;
    next();
}

module.exports = auth;
