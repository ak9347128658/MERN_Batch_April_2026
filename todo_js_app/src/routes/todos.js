const express = require("express");
const {readTodos} = require("../utils/fileHelper.js");
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



module.exports = {
    router
}