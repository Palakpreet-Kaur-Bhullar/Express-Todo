const express = require("express");
const app = express();

app.use(express.json());

let todos = [
    {
        id:1,
        title: "Complete ASD Assignments",
        completed: false
    },
    {
        id:2,
        title: "Buy stationery",
        completed: true
    },
    {
        id:3,
        title: "Go shopping",
        completed: false
    }
];

app.get('/todos',(req,res)=>{
    res.json(todos)
})
app.get('/todos/:id',(req,res)=>{
    let id = req.params.id;
    res.json(todos[id-1])
})

app.post('/todos',(req,res)=>{
    todos.push(req.body);
    res.json(req.body)
})

app.put('/todos/:id',(req,res)=>{
    let id = req.params.id;
    todos[id-1] = req.body;
    res.json(todos[id-1]);
})

app.delete('/todos/:id',(req,res)=>{
    let id = req.params.id;
    todos.splice(id-1,1);
    res.send("Successfully deleted")
})

app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})
