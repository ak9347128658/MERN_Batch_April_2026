
const url = `http://localhost:3001/todos`;


// async function getTodos(){
//     try{
//         const response = await fetch(url);
//         const data =  await response.json();
//         console.log(data)
//     }catch(error){
//         console.log("error : ",error)
//     }
// }

// getTodos();

// create todo
// async function createTodo(todo){
//     try{
//       const response = await fetch(url,{
//        method: "POST",
//        headers:{
//         "Content-Type":"application/json"
//        },
//        body: JSON.stringify(todo) 
//       })
//       const data = await response.json();
//       console.log(data);
//     }catch(error){
//         console.log(error)
//     }
// } 

// const newTodo = {
//  "title":"Need to go start work at 10:30 am"   
// }

// createTodo(newTodo);

// update data by patch method
// const todoId = 5;
// const patchEndpoint = url+"/"+todoId;  // http://localhost:3001/todos/5

// const updateTodoItem = {
//     title:"Need to go start lunch at 1 pm",
//     done: true
// }

// async function updateTodo(patchendpoint,todo){
//     try{
//       const response = await fetch(patchEndpoint,{
//        method: "PATCH",
//        headers:{
//         "Content-Type":"application/json"
//        },
//        body: JSON.stringify(todo) 
//       })
//       const data = await response.json();
//       console.log(data);
//     }catch(error){
//         console.log(error)
//     }
// } 

// updateTodo(patchEndpoint,updateTodoItem);


// Delete todo
const todoId = 5;
const deleteEndpoint = url+"/"+todoId;  // http://localhost:3001/todos/5
async function deleteTodo(deleteEndpoint){
    try{
       const resposne = await fetch(deleteEndpoint,{
        method:"DELETE"
       });
       const data = await resposne.json();
       console.log(data)
    }catch(error){
        console.log(error);
    }
}

deleteTodo(deleteEndpoint);