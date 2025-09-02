import { useContext, useState } from "react";
import { GlobalContext } from "./providers/context-provider";
import { useMemo } from "react";
import { FILTERS } from "../constants";
import TodoItem from "./todo-item";

const TodoList = ({ setIsModalOpen, setCurrentTodo }) => {
  const [filter, setFilter] = useState("all");

  const { todos, clearCompleted } = useContext(GlobalContext);

  const filtered = useMemo(
    () => todos.filter(FILTERS[filter]),
    [todos, filter]
  );
  const itemsLeft = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

  return (
    <section className="card">
      <ul className="todo-list" role="list">
        {filtered.length === 0 && (
          <li className="empty">
            No items here. Try being honest about your procrastination and add
            one.
          </li>
        )}
        {filtered.map((todo, index) => {
          return (
            <TodoItem
              setCurrentTodo={setCurrentTodo}
              setIsModalOpen={setIsModalOpen}
              todo={todo}
              filtered={filtered}
              visibleIndex={index}
              key={todo.id}
            />
          );
        })}
      </ul>

      <footer className="controls">
        <span className="muted items-count">
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
  );
};

export default TodoList;
