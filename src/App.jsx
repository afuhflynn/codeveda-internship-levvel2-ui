import React, { useState } from "react";
import Modal from "./components/modal";
import { serverURL } from "./constants";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const res = await axios.get(`${serverURL}/todos`);

        const data = res.data;
        if (!data.todos) {
          alert("An error occurred fetching your tasks.");
          return;
        }
        setTodos(data.todos);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTodos();
  }, []);

  const addTodo = async () => {
    try {
      if (!newTodo.trim()) return;
      const res = await axios.post(`${serverURL}/todos`, {
        body: newTodo,
        complete: false,
      });
      const data = res.data;
      const newTask = data.todo;
      setTodos([...todos, newTask]);
      setNewTodo("");
    } catch (error) {
      console.error(error);
      if (error.status === 409) {
        alert(`Item: ${newTodo} already exists.`);
      }
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;
      const res = await axios.put(`${serverURL}/todos/${id}/markcomplete`, {
        complete: !todo.complete,
      });
      const data = res.data;
      if (!data.todo) {
        return;
      }
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, complete: !todo.complete } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;
      const res = await axios.delete(`${serverURL}/todos/${id}`);
      const data = res.data;
      if (!data.todo) {
        return;
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const updateTodo = async (updatedText) => {
    try {
      const res = await axios.put(`${serverURL}/todos/${currentTodo.id}`, {
        body: updatedText,
      });
      const data = res.data;
      if (!data.todo || !data.todo.body) {
        return;
      }
      setTodos(
        todos.map((todo) =>
          todo.id === currentTodo.id ? { ...todo, body: updatedText } : todo
        )
      );
      setIsModalOpen(false);
      setCurrentTodo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
}
