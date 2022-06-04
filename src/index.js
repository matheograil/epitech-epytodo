const express = require('express');
const app = express();
const port = 3000;

// Packages
require('dotenv').config();
const bodyParser = require('body-parser');

// Middlewares
const authMiddleware = require('./middleware/auth');
const userNotFoundMiddleware = require('./middleware/userNotFound');
const todoNotFoundMiddleware = require('./middleware/todoNotFound');

// Routes
const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const todosRoutes = require('./routes/todos/todos');

// Consideration of body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', authRoutes.register);
app.post('/login', authRoutes.login);
app.get('/user', authMiddleware, userRoutes.user);
app.get('/user/todos', authMiddleware, userRoutes.userTodos);
app.get('/users/:id', authMiddleware, userNotFoundMiddleware, userRoutes.userById);
app.put('/users/:id', authMiddleware, userNotFoundMiddleware, userRoutes.userUpdate);
app.delete('/users/:id', authMiddleware, userNotFoundMiddleware, userRoutes.userDelete);
app.get('/todos', authMiddleware, todosRoutes.todos);
app.get('/todos/:id', authMiddleware, todoNotFoundMiddleware, todosRoutes.todo);
app.post('/todos', authMiddleware, todosRoutes.todoInsert);
app.put('/todos/:id', authMiddleware, todoNotFoundMiddleware, todosRoutes.todoUpdate);
app.delete('/todos/:id', authMiddleware, todoNotFoundMiddleware, todosRoutes.todoDelete);

app.listen(port, () => {
    console.log(`App listening on port ${port} !`);
});
