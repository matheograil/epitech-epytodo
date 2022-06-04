# EPyTodo

The project idea is to build a Todo List.


## Project structure

```Bash
├── src
│   ├── config
│   │   └── db.js  # Database connection
│   ├── middleware
│   │   ├── auth.js  # Checks token
│   │   ├── todoNotFound.js  # Checks that the todo exists
│   │   └── userNotFound.js  # Checks that the user exists
│   ├── routes
│   │   ├── auth
│   │   │   └── auth.js  # Routes related to authentication
│   │   ├── todos
│   │   │   └── todos.js  # Routes related to todos
│   │   │   └── todos.query.js  # Database queries related to todos
│   │   └── user
│   │       └── user.js  # Routes related to users
│   │       └── user.query.js  # Database queries related to users
│   └── index.js  # Entry point
├── .dockerignore
├── .env  # Global variables
├── .gitignore
├── docker-compose.yml  # Allows to launch Database/API
├── Dockerfile
├── Epytodo.postman_collection.json  # Postman collection
├── epytodo.sql  # SQL schema
├── package-lock.json
├── package.json
└── README.md
```

We've created two more files : _todoNotFound.js_ and _userNotFound.js_. They allow to ensure that the todo/user exists.


## Config

You can change global variables in this file : _.env_.

| Variable name       | Description               |
|---------------------|---------------------------|
| MYSQL_HOST          | IP of Database            |
| MYSQL_USER          | User of Database          |
| MYSQL_DATABASE      | Name of Database          |
| MYSQL_ROOT_PASSWORD | Root password of Database |
| SECRET              | String that encrypts JWT  |


## Launching Database/API with Docker

`sudo docker-compose up database`

Wait few minutes, then :

`sudo docker-compose up web`


## Postman

You can also test our API with Postman collection file : _Epytodo.postman_collection.json_.
