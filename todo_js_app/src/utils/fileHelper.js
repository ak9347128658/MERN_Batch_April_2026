const fs = require('fs');
const path = require('path');


const DATA_FILE_PATH = path.join(__dirname,'..','data','todos.json');


function readTodos(){
    const raw = fs.readFileSync(DATA_FILE_PATH,'utf-8');

    return JSON.parse(raw);
}

function writeTodos(todos){
   const json = JSON.stringify(todos,null,2);

   fs.writeFileSync(DATA_FILE_PATH,json,'utf-8');
}


module.exports = {
    readTodos,writeTodos
}