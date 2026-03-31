import { useState } from "react";

const filters = ["All", "Active", "Completed"];

const priorityConfig = {
  High: { color: "#ef4444", bg: "#fef2f2", label: "High" },
  Medium: { color: "#f59e0b", bg: "#fffbeb", label: "Medium" },
  Low: { color: "#22c55e", bg: "#f0fdf4", label: "Low" },
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function TodoApp() {
  const [todos, setTodos] = useState([
    {
      id: generateId(),
      text: "Design the UI layout",
      completed: true,
      priority: "High",
    },
    {
      id: generateId(),
      text: "Set up React project structure",
      completed: false,
      priority: "Medium",
    },
    {
      id: generateId(),
      text: "Write unit tests",
      completed: false,
      priority: "Low",
    },
  ]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const filtered = todos.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const progress =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  function addTodo() {
    if (!input.trim()) return;
    setTodos([
      { id: generateId(), text: input.trim(), completed: false, priority },
      ...todos,
    ]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function startEdit(todo) {
    setEditId(todo.id);
    setEditText(todo.text);
  }

  function saveEdit(id) {
    if (!editText.trim()) return;
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, text: editText.trim() } : t))
    );
    setEditId(null);
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.completed));
  }

  const style = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #f0ece4;
      font-family: 'Syne', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 40px 16px 80px;
    }

    .app {
      width: 100%;
      max-width: 560px;
    }

    .header {
      margin-bottom: 28px;
    }

    .header-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      color: #999;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .header-title {
      font-size: 40px;
      font-weight: 800;
      color: #1a1a1a;
      line-height: 1;
      letter-spacing: -1px;
    }

    .header-title span {
      color: #d97706;
    }

    .progress-bar-wrap {
      margin-top: 16px;
      background: #e2ddd5;
      border-radius: 99px;
      height: 6px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #d97706, #f59e0b);
      border-radius: 99px;
      transition: width 0.5s ease;
    }

    .progress-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: #aaa;
      margin-top: 8px;
    }

    .input-row {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .todo-input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #e2ddd5;
      border-radius: 12px;
      background: #fff;
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      color: #1a1a1a;
      outline: none;
      transition: border-color 0.2s;
    }

    .todo-input:focus { border-color: #d97706; }

    .priority-select {
      padding: 12px 10px;
      border: 2px solid #e2ddd5;
      border-radius: 12px;
      background: #fff;
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      color: #555;
      outline: none;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .priority-select:focus { border-color: #d97706; }

    .add-btn {
      padding: 12px 20px;
      background: #1a1a1a;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }

    .add-btn:hover { background: #d97706; }
    .add-btn:active { transform: scale(0.95); }

    .filters {
      display: flex;
      gap: 6px;
      margin-bottom: 20px;
    }

    .filter-btn {
      padding: 6px 16px;
      border-radius: 99px;
      border: 2px solid transparent;
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      background: transparent;
      color: #888;
    }

    .filter-btn:hover { color: #1a1a1a; }

    .filter-btn.active {
      background: #1a1a1a;
      color: #fff;
    }

    .todo-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: #fff;
      border-radius: 14px;
      border: 2px solid #f0ece4;
      transition: border-color 0.2s, transform 0.15s;
      animation: slideIn 0.25s ease;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .todo-item:hover { border-color: #e2ddd5; transform: translateX(2px); }
    .todo-item.done { opacity: 0.55; }

    .check-btn {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid #ddd;
      background: transparent;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .check-btn.checked {
      background: #22c55e;
      border-color: #22c55e;
    }

    .check-btn:hover { border-color: #22c55e; }

    .check-icon {
      color: #fff;
      font-size: 12px;
      font-weight: 700;
    }

    .todo-text-wrap { flex: 1; min-width: 0; }

    .todo-text {
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .todo-text.done {
      text-decoration: line-through;
      color: #aaa;
    }

    .edit-input {
      width: 100%;
      border: none;
      outline: none;
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      background: transparent;
      border-bottom: 2px solid #d97706;
      padding-bottom: 2px;
    }

    .priority-tag {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 99px;
      flex-shrink: 0;
      letter-spacing: 0.05em;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
      padding: 4px;
      opacity: 0;
      transition: opacity 0.2s;
      border-radius: 6px;
    }

    .todo-item:hover .icon-btn { opacity: 1; }

    .icon-btn:hover { background: #f0ece4; }

    .footer {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-count {
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      color: #aaa;
    }

    .clear-btn {
      font-family: 'Syne', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: #ef4444;
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .clear-btn:hover { opacity: 1; }

    .empty {
      text-align: center;
      padding: 40px 0;
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      color: #bbb;
    }

    .empty-icon { font-size: 36px; margin-bottom: 12px; }
  `;

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="header">
          <div className="header-label">My Workspace</div>
          <div className="header-title">
            Todo<span>.</span>
          </div>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-label">
            {completedCount} of {todos.length} tasks complete — {progress}%
          </div>
        </div>

        <div className="input-row">
          <input
            className="todo-input"
            placeholder="Add a new task…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <select
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {Object.keys(priorityConfig).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button className="add-btn" onClick={addTodo}>
            +
          </button>
        </div>

        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✦</div>
              No tasks here yet.
            </div>
          ) : (
            filtered.map((todo) => {
              const p = priorityConfig[todo.priority];
              return (
                <div
                  key={todo.id}
                  className={`todo-item ${todo.completed ? "done" : ""}`}
                >
                  <button
                    className={`check-btn ${todo.completed ? "checked" : ""}`}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed && <span className="check-icon">✓</span>}
                  </button>

                  <div className="todo-text-wrap">
                    {editId === todo.id ? (
                      <input
                        className="edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(todo.id);
                          if (e.key === "Escape") setEditId(null);
                        }}
                        onBlur={() => saveEdit(todo.id)}
                        autoFocus
                      />
                    ) : (
                      <div
                        className={`todo-text ${todo.completed ? "done" : ""}`}
                      >
                        {todo.text}
                      </div>
                    )}
                  </div>

                  <span
                    className="priority-tag"
                    style={{ color: p.color, background: p.bg }}
                  >
                    {todo.priority}
                  </span>

                  <button
                    className="icon-btn"
                    onClick={() => startEdit(todo)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              );
            })
          )}
        </div>

        {todos.length > 0 && (
          <div className="footer">
            <span className="footer-count">
              {todos.filter((t) => !t.completed).length} remaining
            </span>
            {completedCount > 0 && (
              <button className="clear-btn" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
