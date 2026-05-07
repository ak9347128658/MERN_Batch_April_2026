const fs = require('fs');
const path = require('path');


const DATA_FILE = path.join(__dirname,'..','data','todos.json');


function readTodos(){
    const raw = fs.readFileSync(DATA_FILE,'utf-8');

    return JSON.parse(raw);
}

function writeTodos(todos){
   const json = JSON.stringify(todos,null,2);

   fs.writeFileSync(DATA_FILE,json,'utf-8');
}


module.exports = {
    readTodos,writeTodos
}