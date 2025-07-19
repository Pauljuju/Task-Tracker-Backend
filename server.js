// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

// Load existing tasks
if (fs.existsSync('tasks.json')) {
  tasks = JSON.parse(fs.readFileSync('tasks.json'));
}

// List tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add task
app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), title: req.body.title, done: false };
  tasks.push(task);
  fs.writeFileSync('tasks.json', JSON.stringify(tasks));
  res.status(201).json(task);
});

// Mark as done
app.put('/tasks/:id/done', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.done = true;
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

