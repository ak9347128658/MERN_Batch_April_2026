import myexpress from "express";

const app = myexpress();

const todos =[
    {
     id: 1,
     title:"Buy milk",
     done: true
    },
    {
      id: 2,
      title:"cook food",
      done: false
    }
]


app.use(myexpress.json());

app.get("/todos", (req,res,next) => {
   return res.json(todos)
});              // http://localhost:3001/todos

app.post("/todos",(req,res,next) => {
   try{
       console.log("req : ",req);
       const {id,title,done} = req.body;
       todos.push({id,title,done});
       return res.status(200).json({
        message: 
            "Todo added successfully.",
        sucess: true
       })
   }catch(error){
    return req.status(404).json({
        error: "Opps! something went wrong."
    })
   }
});



app.listen(3001,() => {
    console.log("Server is running on http://localhost:3001")
})
