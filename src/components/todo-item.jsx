import { useContext } from "react";
import { GlobalContext } from "./providers/context-provider";
import { useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { useCallback } from "react";

const TodoItem = ({
  todo,
  setIsModalOpen,
  setCurrentTodo,
  filtered,
  visibleIndex,
}) => {
  const [dragIndex, setDragIndex] = useState(null);
  const [absoluteIndex, setAbsoluteIndex] = useState(null);
  const { markComplete, deleteTodoItem, reorder, todos } =
    useContext(GlobalContext);

  // Map visible items’ index to actual index in full list for drag reorder
  const getAbsoluteIndex = useCallback(
    (visibleIdx) => {
      const id = filtered[visibleIdx]?.id;
      return todos.findIndex((t) => t.id === id);
    },
    [filtered, todos]
  );

  useEffect(() => {
    setAbsoluteIndex(getAbsoluteIndex(visibleIndex));
  }, [visibleIndex, setAbsoluteIndex, getAbsoluteIndex, dragIndex]);

  const toggleComplete = async (id) => {
    try {
      await markComplete(id);
    } catch (error) {
      console.error(error);
      toast.error(`An error occurred. Try again later`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoItem(id);
    } catch (error) {
      console.error(error);
      toast.error(`An error occurred. Try again later`);
    }
  };

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
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
  return (
    <li
      className={`todo ${todo.complete ? "done" : ""}`}
      draggable
      onDragStart={() => setDragIndex(absoluteIndex)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        console.log("Yep", dragIndex, absoluteIndex);
        if (dragIndex === null) return;
        reorder(dragIndex, absoluteIndex);
        setDragIndex(null);
      }}
    >
      <button
        className={`checkbox ${todo.complete ? "checked" : ""}`}
        aria-pressed={todo.complete}
        aria-label={todo.complete ? "Mark as active" : "Mark as completed"}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.complete ? "✓" : ""}
      </button>

      <p
        className="todo-text"
        tabIndex={0}
        onKeyDown={(e) => onKeyReorder(e, visibleIndex)}
        onClick={() => openEditModal(todo)}
      >
        {todo.body}
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
};

export default TodoItem;
