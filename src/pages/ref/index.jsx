import React, { useEffect, useMemo, useRef, useState } from "react";

// util keys
const LS_TODOS = "fm_todos_v1";
const LS_THEME = "fm_theme_v1";

const initialTodos = [
  {
    id: crypto.randomUUID(),
    text: "Complete Frontend Mentor challenge",
    done: false,
  },
  { id: crypto.randomUUID(), text: "Read for 20 minutes", done: true },
  { id: crypto.randomUUID(), text: "Practice algorithms", done: false },
];

const prefersDark = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(LS_THEME);
    return saved || (prefersDark() ? "dark" : "light");
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(LS_THEME, theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

function useTodos() {
  const [todos, setTodos] = useState(() => {
    const raw = localStorage.getItem(LS_TODOS);
    return raw ? JSON.parse(raw) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem(LS_TODOS, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: t, done: false },
      ...prev,
    ]);
  };

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((td) => (td.id === id ? { ...td, done: !td.done } : td))
    );
  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((td) => td.id !== id));
  const clearCompleted = () =>
    setTodos((prev) => prev.filter((td) => !td.done));

  const reorder = (fromIndex, toIndex) => {
    setTodos((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    reorder,
    setTodos,
  };
}

const FILTERS = {
  all: () => true,
  active: (t) => !t.done,
  completed: (t) => t.done,
};

export default function App() {
  const { theme, toggle } = useTheme();
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, reorder } =
    useTodos();
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");
  const [dragIndex, setDragIndex] = useState(null);
  const inputRef = useRef(null);

  const filtered = useMemo(
    () => todos.filter(FILTERS[filter]),
    [todos, filter]
  );
  const itemsLeft = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
    inputRef.current?.focus();
  };

  // accessibility: keyboard reordering (Alt+ArrowUp/Down)
  const onKeyReorder = (e, index) => {
    if (!e.altKey) return;
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      reorder(index, index - 1);
    }
    if (e.key === "ArrowDown" && index < filtered.length - 1) {
      e.preventDefault();
      reorder(index, index + 1);
    }
  };

  // Map visible items’ index to actual index in full list for drag reorder
  const getAbsoluteIndex = (visibleIdx) => {
    const id = filtered[visibleIdx]?.id;
    return todos.findIndex((t) => t.id === id);
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <h1 className="logo">TODO</h1>
          <button
            aria-label="Toggle theme"
            className="icon-btn"
            onClick={toggle}
            title="Toggle theme"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>

        <form className="new-todo container" onSubmit={handleSubmit}>
          <span className="checkbox ghost" aria-hidden="true" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Create a new todo…"
            aria-label="Create a new todo"
          />
        </form>
      </header>

      <main className="container">
        <section className="card">
          <ul className="todo-list" role="list">
            {filtered.length === 0 && (
              <li className="empty">
                No items here. Try being honest about your procrastination and
                add one.
              </li>
            )}
            {filtered.map((todo, visibleIndex) => {
              const absoluteIndex = getAbsoluteIndex(visibleIndex);

              return (
                <li
                  key={todo.id}
                  className={`todo ${todo.done ? "done" : ""}`}
                  draggable
                  onDragStart={() => setDragIndex(absoluteIndex)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIndex === null) return;
                    reorder(dragIndex, absoluteIndex);
                    setDragIndex(null);
                  }}
                >
                  <button
                    className={`checkbox ${todo.done ? "checked" : ""}`}
                    aria-pressed={todo.done}
                    aria-label={
                      todo.done ? "Mark as active" : "Mark as completed"
                    }
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.done ? "✓" : ""}
                  </button>

                  <p
                    className="todo-text"
                    tabIndex={0}
                    onKeyDown={(e) => onKeyReorder(e, visibleIndex)}
                  >
                    {todo.text}
                  </p>

                  <button
                    className="delete"
                    aria-label="Delete todo"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>

          <footer className="controls">
            <span className="muted">
              {itemsLeft} item{itemsLeft !== 1 ? "s" : ""} left
            </span>

            <div className="filters" role="tablist" aria-label="Filter todos">
              {["all", "active", "completed"].map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  className={filter === key ? "active" : ""}
                  onClick={() => setFilter(key)}
                >
                  {key[0].toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            <button className="muted clear" onClick={clearCompleted}>
              Clear Completed
            </button>
          </footer>
        </section>

        <p className="hint">Drag and drop to reorder list</p>
      </main>

      <footer className="attribution">
        <p>
          Challenge inspired by Frontend Mentor. Built in React, no libraries,
          no excuses.
        </p>
      </footer>
    </div>
  );
}
