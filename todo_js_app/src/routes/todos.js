const express = require("express");
const {readTodos, writeTodos} = require("../utils/fileHelper.js");
const router = express.Router();

router.get("/", (req,res,next) => {
   const todos = readTodos();

   return res.status(200).json(todos);
});

router.get("/:id", (req,res,next) => {
   const id = Number(req.params.id);
   const todos = readTodos();

   const todo = todos.find((todo) => {
      return todo.id === id;
   })
   
   if(!todo){
      return res.status(404).json({message: "Todo not found"});
   }

   return res.status(200).json(todo);
});

// POST /todos
// create a new todo
// body (payload) : {"title": "Buy Milk"}
router.post("/",(req,res,next) =>{
   const {title} = req.body;

   if(!title || title.trim() === ''){
      return res.status(400).json({
         error: "title is required"
      })
   }

   const todos = readTodos();

   // Generate a new unique id (max existing id + 1)
   const lastId = Math.max(...todos.map(t => t.id));  //Math.max(8,9,10,16)
   const newId = todos.length > 0 ? (lastId + 1) : 1;

   const newTodo ={
      id: newId,
      title: title,
      done: false
   }

   todos.push(newTodo);
   writeTodos(todos);

   return res.status(201).json(newTodo);
})

// ------------------------------
// PUT  /todos/:id
// Update an existing todo
// body (payload) : {"title": "Buy Milk","done": true}
//----------------------------
router.put("/:id",(req,res,next) => {
   const todos = readTodos();
   const id = Number(req.params.id);
   const index = todos.findIndex(t => t.id === id);

   if(index === -1){
      return res.status(404).json({message: "Todo not found"});
   }

   const {title,done} = req.body;

   if(!title || title.trim() === ""){
      return res.status(400).json({error: "Title is required"});
   }

   // Replace the object at that index
   todos[index] = {
      id,
      title: title.trim(),
      done
   }

   writeTodos(todos);
   return res.status(200).json(todos[index]);
});

// ---------------------
// PATCH /todos/:id
// Partially updates a todo - only fields you send chage
//---------------------
router.patch("/:id",(req,res,next) => {
   const todos = readTodos();
   const id = Number(req.params.id);
   const index = todos.findIndex(t => t.id === id);

   if(index === -1){
      return res.status(404).json({
         error: "Todo not found"
      })
   }

   // spread exsitng data first,then overwirte only what was send
   let updatedTodo ={
      ...todos[index],
      ...req.body
   }
   todos[index] =updatedTodo;

   writeTodos(todos)
   return res.status(200).json(todos[index]);
})

router.delete("/:id",(req,res,next)=> {
   const todos = readTodos();
   const id = Number(req.params.id);
   const index = todos.findIndex(t => t.id === id);

   if(index === -1){
      return res.status(404).json({
         error: "Todo not found"
      })
   }

   // let arr = [1,2,3,4,5];
   // arr.splice(1,2);
// array.splice(start, deleteCount)  // start id the index in array, deleteCount how many to be deleted
   // [1,4,5]

   const deleted = todos.splice(index,1)[0]; // remove 1 item ,keep the deleted one
   writeTodos(todos);
   return res.json({
      message: "todo deleted", 
      todo: deleted
   })
})

module.exports = {
    router
}