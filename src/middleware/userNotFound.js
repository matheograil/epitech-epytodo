const { getUserIdById } = require('../routes/user/user.query');

async function userNotFound(req, res, next) {
    const userId = Number(req.params.id);

    if (!userId) {
        return res.status(400).json({ 'msg': 'Bad parameter' });
    }
    if (await getUserIdById(userId) === false) {
        return res.status(404).json({ 'msg': 'Not found' });
    }
    req.id = userId;
    next();
}

module.exports = userNotFound;
