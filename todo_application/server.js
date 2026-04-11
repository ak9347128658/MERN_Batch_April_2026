const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// ─── Middleware ───────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// ─── JSON "Database" Helpers ──────────────────────────────────────
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ todos: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ─── CRUD Routes ──────────────────────────────────────────────────

// GET /api/todos  →  Read all todos
app.get('/api/todos', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.todos });
});

// GET /api/todos/:id  →  Read one todo
app.get('/api/todos/:id', (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
  res.json({ success: true, data: todo });
});

// POST /api/todos  →  Create a todo
app.post('/api/todos', (req, res) => {
  const { title, priority = 'medium' } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  const db = readDB();
  const newTodo = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false,
    priority,
    createdAt: new Date().toISOString()
  };
  db.todos.push(newTodo);
  writeDB(db);
  res.status(201).json({ success: true, data: newTodo });
});

// PUT /api/todos/:id  →  Update a todo
app.put('/api/todos/:id', (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Todo not found' });

  const { title, completed, priority } = req.body;
  if (title !== undefined) db.todos[index].title = title.trim();
  if (completed !== undefined) db.todos[index].completed = completed;
  if (priority !== undefined) db.todos[index].priority = priority;
  db.todos[index].updatedAt = new Date().toISOString();

  writeDB(db);
  res.json({ success: true, data: db.todos[index] });
});

// DELETE /api/todos/:id  →  Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Todo not found' });

  const deleted = db.todos.splice(index, 1)[0];
  writeDB(db);
  res.json({ success: true, data: deleted });
});

// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Todo API running at http://localhost:${PORT}`);
  console.log(`📁 Database file: ${DB_FILE}\n`);
  console.log('API Endpoints:');
  console.log('  GET    /api/todos        → List all todos');
  console.log('  GET    /api/todos/:id    → Get one todo');
  console.log('  POST   /api/todos        → Create todo');
  console.log('  PUT    /api/todos/:id    → Update todo');
  console.log('  DELETE /api/todos/:id    → Delete todo\n');
});
