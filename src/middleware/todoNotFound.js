const { getTodoId } = require('../routes/todos/todos.query');

async function todoNotFound(req, res, next) {
    const todoId = Number(req.params.id);

    if (!todoId) {
        return res.status(400).json({ 'msg': 'Bad parameter' });
    }
    if (await getTodoId(todoId) === false) {
        return res.status(404).json({ 'msg': 'Not found' });
    }
    req.id = todoId;
    next();
}

module.exports = todoNotFound;
