var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

var todoList = [
    {
        id: uuid(),
        todo: "Implement a REST API"
    }
];

function fetchTodoById(id) {
    const todoItem = todoList.find(function(todoItem) {
        return todoItem.id.toString() === id
    })

    return todoItem
}

// GET /api/todos
// This should respond with the full list of todo items.
app.get('/api/todos', function (request, response, nextFn) {
    response.send(todoList)
})

// GET /api/todos/:id
// This should respond with the information for the matching todo item
// by id.
// If the matching todo does not exist, the server should respond
// with a 404 status code.
app.get('/api/todos/:id', function (request, response, nextFn) {
    const todoItem = fetchTodoById(request.params.id)

    if (todoItem !== undefined) {
        response.send(todoItem)
    } else {
        response.sendStatus(404)
    }
})


// POST /api/todos
// This should take the body of the request and add it to todoList.
// Remember to generate a unique id for the new todo item.
// This endpoint should respond with the new item with it's id.
app.post('/api/todos', function(request, response, nextFn) {

    const newItem = {
        id: uuid(),
        todo: request.body.todo
    }
    todoList.push(newItem)
    console.log(newItem)
    response.send(todoList)
})


// PUT /api/todos/:id
// This should update the matching todo item by id with the
// body of the request.  The endpoint should respond with the
// updated item.
// If the matching todo does not exist, the server should respond
// with a 404 status code.
app.put('/api/todos/:id', function (request, response, nextFn) {
    const todoItem = fetchTodoById(request.params.id)
    
    if (todoItem === undefined) {
        response.sendStatus(404)
        return
    }

    const updates = request.body
    const updatedTodo = Object.assign(todoItem, updates)

    // console.log(updatedTodo, 'updatedTodo')
    // console.log(todoList, 'todoList')

    response.send(updatedTodo)
})


// DELETE /api/todos/:id
// This should remove the matching item from the list of todo items.
// This endpoint should respond with the new length of the list.
// If the matching todo does not exist, the server should respond
// with a 404 status code.

app.delete('/api/todos/:id', function(request, response, nextFn) {
    const todoItem = fetchTodoById(request.params.id)
    const newTodoItems = todoList.filter((todoList) => todoList.id != todoItem)
    console.log(todoItem)

    if(!newTodoItems) {
        response.sendStatus(404)
        return
    } else {
        todoList = newTodoItems
        response.send(todoList)
    }
})


app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})