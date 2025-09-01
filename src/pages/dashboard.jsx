import React, { useState } from "react";
import Modal from "../components/modal";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../components/providers/context-provider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Todos() {
  const [newTodo, setNewTodo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const {
    user,
    isLoading,
    todos,
    createTodo,
    markComplete,
    updateTodoItem,
    deleteTodoItem,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/signin");
    }
  }, [user, navigate, isLoading]);

  const addTodo = async () => {
    try {
      await createTodo(newTodo);
      setNewTodo("");
    } catch (error) {
      console.error(error);

      toast.error(`An error occurred. Try again later`);
    }
  };

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

  const updateTodo = async (updatedText) => {
    try {
      updateTodoItem(updatedText, currentTodo.id);
      setIsModalOpen(false);
      setCurrentTodo(null);
    } catch (error) {
      console.error(error);
      toast.error(`An error occurred. Try again later`);
    }
  };

  return (
    <div className="container">
      <div className="app">
        <h1 className="app-title">Fancy Todo</h1>

        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.complete ? "completed" : ""}`}
            >
              <span onClick={() => toggleComplete(todo.id)}>{todo.body}</span>
              <div className="actions">
                <button className="edit" onClick={() => openEditModal(todo)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isModalOpen && (
          <Modal
            initialValue={currentTodo.body}
            onClose={() => setIsModalOpen(false)}
            onSave={updateTodo}
          />
        )}
      </div>
    </div>
  );
}
