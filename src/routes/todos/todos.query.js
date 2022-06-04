const databaseConnection = require('../../config/db');

async function getTodoId(todoId) {
    const query = await (await databaseConnection).execute('SELECT id FROM todo WHERE id = ?', [todoId]);

    if (query[0].length > 0) {
        return query[0][0].id;
    }
    return false;
}

async function getTodos() {
    const query = await (await databaseConnection).execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo');

    return query[0];
}

async function getTodo(todoId) {
    const query = await (await databaseConnection).execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?', [todoId]);

    return query[0][0];
}

async function insertTodo(title, description, due_time, status, user_id) {
    const query = await (await databaseConnection).execute('INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)',
        [title, description, due_time, status, user_id]);

    return query[0].insertId;
}

async function updateTodo(todoId, title, description, due_time, status, user_id) {
    await (await databaseConnection).execute('UPDATE todo SET title = ?, description = ?, due_time = ?, status = ?, user_id = ? WHERE id = ?',
        [title, description, due_time, status, user_id, todoId]);
}

async function deleteTodo(todoId) {
    (await databaseConnection).execute('DELETE FROM todo WHERE id = ?', [todoId]);
}

module.exports = {
    getTodoId,
    getTodos,
    getTodo,
    insertTodo,
    updateTodo,
    deleteTodo
};
