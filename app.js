const express = require("express");
const app = express();

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
    },
];

app.get('/todos',(req,res)=>{
    res.json(todos)
})
app.get('/todos/:id',(req,res)=>{
    let id = req.params.id;
    res.json(todos[id-1])
})

app.post('/todos',(req,res)=>{

})

// app.put('/todos',(req,res)=>{

// })
// app.delete('/todos',(req,res)=>{

// })

app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})
