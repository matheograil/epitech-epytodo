const { getTodos, getTodo, insertTodo, deleteTodo, updateTodo } = require('./todos.query');

async function todos(req, res) {
    return res.status(200).json(await getTodos());
}

async function todo(req, res) {
    return res.status(200).json(await getTodo(req.id));
}

async function todoInsert(req, res) {
    let todoId;
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const status = req.body.status;
    const user_id = req.body.user_id;

    try {
        todoId = await insertTodo(title, description, due_time, status, user_id);
    } catch(err) {
        return res.status(400).json({ 'msg': 'Bad parameter' });
    }
    return res.status(200).json(await getTodo(todoId));
}

async function todoUpdate(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const status = req.body.status;
    const user_id = req.body.user_id;

    try {
        await updateTodo(req.id, title, description, due_time, status, user_id);
    } catch(err) {
        return res.status(400).json({ 'msg': 'Bad parameter' });
    }
    return res.status(200).json({ title, description, due_time, user_id, status });
}

async function todoDelete(req, res) {
    deleteTodo(req.id);
    return res.status(200).json({ 'msg': `Successfully deleted record number: ${req.id}` });
}

module.exports = {
    todos,
    todo,
    todoInsert,
    todoUpdate,
    todoDelete
};
