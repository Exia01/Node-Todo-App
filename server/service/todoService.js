"use strict";
const Todo = require('mongoose').model('Todo')

exports.todo_index = async () => {
    const todos = await Todo.find({})
    return todos
}
exports.todo_new = async (req) => {
    console.log(req.body)
    const todo = new Todo(req.body).save()
    return todo;
}
exports.todo_delete = async (req) => {
    console.log(req.params)
    const todo = await Todo.findByIdAndRemove(req.params._id);
    return todo
}

