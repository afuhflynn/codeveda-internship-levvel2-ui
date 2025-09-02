import { useEffect, useState } from "react";

const SaveTodos = (key: string) => {
  const [todoList, setTodoList] = useState(() => {
    try {
      const savedTodos = localStorage.getItem(key);
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error: any) {
      console.error(error.message);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todoList));
  }, [todoList, key]);

  return [todoList, setTodoList];
};

export default SaveTodos;
