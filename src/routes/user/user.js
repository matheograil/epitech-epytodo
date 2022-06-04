const bcrypt = require('bcryptjs');
const { getUser, getUserTodos, updateUser, getUserUpdateResponse, deleteUser } = require('./user.query');

async function user(req, res) {
    return res.status(200).json(await getUser(req.userId));
}

async function userTodos(req, res) {
    return res.status(200).json(await getUserTodos(req.userId));
}

async function userById(req, res) {
    return res.status(200).json(await getUser(req.id));
}

async function userUpdate(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if ([email, password, name, firstname].includes(undefined) === true || emailRegex.test(email) === false) {
        return res.status(400).json({ 'msg': 'Bad parameter' });
    }
    try {
        await updateUser(req.id, email, bcrypt.hashSync(password, 10), name, firstname);
    } catch(err) {
        return res.status(409).json({ 'msg': 'Account already exists' });
    }
    return res.status(200).json(await getUserUpdateResponse(req.id));
}

async function userDelete(req, res) {
    deleteUser(req.id);
    return res.status(200).json({ 'msg': `Successfully deleted record number: ${req.id}` });
}

module.exports = {
    user,
    userTodos,
    userById,
    userUpdate,
    userDelete
};
