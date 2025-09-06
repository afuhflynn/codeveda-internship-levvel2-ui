import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/providers/context-provider";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import Header from "../components/header";
import TodoList from "../components/todo-list";

export default function Todos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const { user, isLoading, getAllTodos, updateTodoItem } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/signin");
    }
  }, [user, navigate, isLoading]);

  const updateTodo = async (updatedText) => {
    try {
      await updateTodoItem(updatedText, currentTodo.id);
      setIsModalOpen(false);
      setCurrentTodo(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="app">
      <Header setCurrentTodo={setCurrentTodo} setIsModalOpen={setIsModalOpen} />

      <main className="container">
        <TodoList
          setIsModalOpen={setIsModalOpen}
          setCurrentTodo={setCurrentTodo}
        />

        <p className="hint">Drag and drop to reorder list</p>
      </main>

      <footer className="attribution">
        <p>Design inspired by Frontend Mentor</p>
      </footer>
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
