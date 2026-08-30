const express = require("express");
const app = express();

app.use(express.json());

let todos = [
  {
    id: 1,
    title: "Study Express",
    completed: false,
    priority: "high",
    tags: ["study", "backend"],
    dueDate: "2026-09-01",
    reminder: "2026-08-31",
    sharedWith: ["Manas"],
    notification: true
  },
  {
    id: 2,
    title: "Complete assignment",
    completed: true,
    priority: "medium",
    tags: ["college","study"],
    dueDate: "2026-09-02",
    reminder: null,
    sharedWith: [],
    notification: false
  },
  {
    id: 3,
    title: "Buy stationery",
    completed: false,
    priority: "low",
    tags: ["college"],
    dueDate: "2026-09-02",
    reminder: null,
    sharedWith: [],
    notification: false
  }
];

// Display todos
app.get('/todos',(req,res)=>{
    // for all todos => no query params
    // console.log(req.query)
    let result = todos;
    
    // Searching by title => QUERY PARAMS
    if(req.query.search){
        result = result.filter((obj)=>{
            return obj.title.trim().toLowerCase().includes(req.query.search.trim().toLowerCase());
        })
    }
    // Filter by priority
    if(req.query.priority){
        result = result.filter((obj)=>{
            return obj.priority.trim().toLowerCase() == (req.query.priority.trim().toLowerCase());
        })
    }
    // Filter by completed behaviour
    if(req.query.completed){
        result = result.filter((obj)=>{
            return String(obj.completed) == req.query.completed.trim().toLowerCase();
        })
    }
    // Filter by one tag
    if(req.query.tag){
        result = result.filter((obj)=>{
            return obj.tags.includes(req.query.tag.trim().toLowerCase());
        })
    }
    // Filter by multiple tags => later

    res.json(result)


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
