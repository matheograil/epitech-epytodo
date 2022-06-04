const databaseConnection = require('../../config/db');

async function getUserIdByEmail(email) {
    const query = await (await databaseConnection).execute('SELECT id FROM user WHERE email = ?', [email]);

    if (query[0].length > 0) {
        return query[0][0].id;
    }
    return false;
}

async function getUserIdById(userId) {
    const query = await (await databaseConnection).execute('SELECT id FROM user WHERE id = ?', [userId]);

    if (query[0].length > 0) {
        return (query[0][0].id);
    }
    return false;
}

async function insertUser(email, password, name, firstname) {
    await (await databaseConnection).execute('INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)',
        [email, password, name, firstname]);
}

async function getUserPassword(email) {
    const query = await (await databaseConnection).execute('SELECT password FROM user WHERE email = ?', [email]);

    if (query[0].length > 0) {
        return query[0][0].password;
    }
    return false;
}

async function getUser(userId) {
    const query = await (await databaseConnection).execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?',
        [userId]);

    return query[0][0];
}

async function getUserTodos(userId) {
    const query = await (await databaseConnection).execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE user_id = ?',
        [userId]);

    return query[0];
}

async function updateUser(userId, email, password, name, firstname) {
    await (await databaseConnection).execute('UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?',
        [email, password, name, firstname, userId]);
}

async function getUserUpdateResponse(userId) {
    const query = await (await databaseConnection).execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?',
        [userId]);

    return query[0][0];
}

async function deleteUser(userId) {
    (await databaseConnection).execute('DELETE FROM todo WHERE user_id = ?', [userId]);
    (await databaseConnection).execute('DELETE FROM user WHERE id = ?', [userId]);
}

module.exports = {
    getUserIdByEmail,
    getUserIdById,
    insertUser,
    getUserPassword,
    getUser,
    getUserTodos,
    updateUser,
    getUserUpdateResponse,
    deleteUser
};
