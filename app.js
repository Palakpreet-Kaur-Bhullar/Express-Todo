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
    notification: true,
  },
  {
    id: 2,
    title: "Complete assignment",
    completed: true,
    priority: "medium",
    tags: ["college", "study"],
    dueDate: "2026-09-02",
    reminder: null,
    sharedWith: [],
    notification: false,
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
    notification: false,
  },
];

// Display todos (All, searching,filtering)

app.get("/todos", (req, res) => {
  // for all todos => no query params
  // console.log(req.query)
  let result = todos;

  // Searching by title => QUERY PARAMS
  if (req.query.search) {
    result = result.filter((obj) => {
      return obj.title
        .trim()
        .toLowerCase()
        .includes(req.query.search.trim().toLowerCase());
    });
  }
  // Filter by priority
  if (req.query.priority) {
    result = result.filter((obj) => {
      return (
        obj.priority.trim().toLowerCase() ==
        req.query.priority.trim().toLowerCase()
      );
    });
  }
  // Filter by completed behaviour
  if (req.query.completed) {
    result = result.filter((obj) => {
      return String(obj.completed) == req.query.completed.trim().toLowerCase();
    });
  }
  // Filter by one tag
  if (req.query.tag) {
    result = result.filter((obj) => {
      return obj.tags.includes(req.query.tag.trim().toLowerCase());
    });
  }
  // Filter by multiple tags => later

  res.json(result);
});

// Display todo by ID

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  let found = todos.find((obj) => obj.id == id);
  if (found == undefined) {
    res.status(404).send("Todo not found");
    return;
  }
  res.json(found);
});

// Creating a new todo task

app.post("/todos", (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
    priority: req.body.priority || "low",
    tags: req.body.tags || [],
    dueDate: req.body.dueDate || null,
    reminder: req.body.reminder || null,
    sharedWith: req.body.sharedWith || [],
    notification: req.body.notification || false,
  };

  todos.push(todo);
  res.status(200).json(req.body);
});

// Replacing an existing todo task completely

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  // invalid id
  if (!todo) {
    return res.status(404).send("Todo not found");
  }

  todos[i - 1] = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    priority: req.body.priority,
    tags: req.body.tags || [],
    dueDate: req.body.dueDate || null,
    reminder: req.body.reminder || null,
    sharedWith: req.body.sharedWith || [],
    notification: req.body.notification || false,
  };

  // update certain properties of an existing todo => BUT THIS IS TECHNICALLY THE FUNCTIONALITY OF PATCH
});

// Updating specific properties of an existing to do task

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  // invalid id
  if (!todo) {
    return res.status(404).send("Todo not found");
  }
  // BEST DYNAMIC WAY TO ASSIGN
  Object.assign(todo, req.body);

  // // Alternate way :

  //   if (req.body.title !== undefined) {
  //     todo.title = req.body.title;
  //   }

  //   if (req.body.completed !== undefined) {
  //     todo.completed = req.body.completed;
  //   }

  //   if (req.body.priority !== undefined) {
  //     todo.priority = req.body.priority;
  //   }

  //   if (req.body.tags !== undefined) {
  //     todo.tags = req.body.tags;
  //   }

  //   if (req.body.dueDate !== undefined) {
  //     todo.dueDate = req.body.dueDate;
  //   }

  //   if (req.body.reminder !== undefined) {
  //     todo.reminder = req.body.reminder;
  //   }

  //   if (req.body.notification !== undefined) {
  //     todo.notification = req.body.notification;
  //   }
  //   res.json(todo);
});

// Deleting an entire todo task
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).send("Todo not found");
  }

  todos.splice(index, 1);
  res.send("Todo deleted successfully");

});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
