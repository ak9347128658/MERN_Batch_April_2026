const express = require("express");
const {router: todosRouter} = require('./src/routes/todos.js');

const app = express();

app.use(express.json());

app.use("/todos",todosRouter)

app.listen(3001,() => {
    console.log("Server start successfully http://localhost:3001")
})