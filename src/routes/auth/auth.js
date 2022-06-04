const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { insertUser, getUserPassword } = require('../user/user.query');

async function register(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if ([email, password, name, firstname].includes(undefined) === true || emailRegex.test(email) === false) {
        return res.status(400).json({ 'msg': 'Bad parameter' });
    }
    try {
        await insertUser(email, bcrypt.hashSync(password, 10), name, firstname);
    } catch(err) {
        return res.status(409).json({ 'msg': 'Account already exists' });
    }
    const token = jwt.sign({ email: email }, process.env.SECRET);
    return res.status(200).json({ token });
}

async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if ([email, password].includes(undefined) === true || emailRegex.test(email) === false) {
        return res.status(400).json({ 'msg': 'Bad parameter' });
    }
    const hashedPassword = await getUserPassword(email);
    if (hashedPassword === false || bcrypt.compareSync(password, hashedPassword) === false) {
        return res.status(401).json({ 'msg': 'Invalid Credentials' });
    }
    const token = jwt.sign({ email: email }, process.env.SECRET);
    return res.status(200).json({ token });
}

module.exports = {
    register,
    login
};
