import { useState, createContext, useEffect } from "react";
import { privateAxios } from "../../config/axios.config";
import { serverURL } from "../../constants";
import axios from "axios";
import { toast } from "sonner";
import { useCallback } from "react";
import useTheme from "../../hooks/use-theme";

const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
  // Example state that you want to share globally
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const { theme, toggle: toggleTheme } = useTheme();

  // handle todo reorder on the screen
  const reorder = (fromIndex, toIndex) => {
    setTodos((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  };

  // handle clear and delete completed todos
  const clearCompleted = async () => {
    setIsLoading(true);
    try {
      const res = await privateAxios.delete(`/todos/clearcomplete`);
      const data = res.data;
      if (!data?.todos) {
        return toast.warning("An unexpected error occurred. Try again later.");
      }
      setTodos((prev) => prev.filter((td) => !td.complete));
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  // get user profile from api
  const getUserProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await privateAxios.get(`/users/me`);

      const data = res.data;

      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAllTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await privateAxios.get(`/todos`);

      const data = res.data;
      if (!data.todos) {
        toast.warning("An error occurred fetching your tasks.");
        return;
      }
      setTodos(data.todos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const createTodo = async (value) => {
    setIsLoading(true);
    try {
      if (!value.trim()) return;
      const res = await privateAxios.post(`/todos`, {
        body: value,
        complete: false,
      });
      const data = res.data;
      const newTask = data.todo;
      setTodos([...todos, newTask]);
    } catch (error) {
      console.error(error);

      if (error.status === 409) {
        toast.error(`Item: ${value} already exists.`);
      }
      throw Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const markComplete = async (id) => {
    setIsLoading(true);
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;
      const res = await privateAxios.put(`/todos/${id}/markcomplete`, {
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
      throw Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodoItem = async (updatedText, id) => {
    try {
      const res = await privateAxios.put(`/todos/${id}`, {
        body: updatedText,
      });
      const data = res.data;
      if (!data.todo || !data.todo.body) {
        return;
      }
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, body: updatedText } : todo
        )
      );
    } catch (error) {
      console.error(error);
      if (error.status === 409) {
        toast.error(`Item: ${updatedText} already exists.`);
      }
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodoItem = async (id) => {
    setIsLoading(true);
    try {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;
      const res = await privateAxios.delete(`/todos/${id}`);
      const data = res.data;
      if (!data.todo) {
        return;
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async (userData) => {
    try {
      const res = await axios.post(`${serverURL}/users/sign-up`, userData);
      const data = res.data;

      return data.success;
    } catch (error) {
      throw new Error(error);
    }
  };

  // You can also add more state or functions here
  const signIn = async (userData) => {
    try {
      const res = await privateAxios.post(
        `${serverURL}/users/sign-in`,
        userData
      );
      const data = res.data;

      setUser(data.user);
      return data.success;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  // context provider value object
  const contextValue = {
    user,
    signIn,
    signOut,
    getUserProfile,
    signUp,
    isLoading,
    todos,
    getAllTodos,
    createTodo,
    markComplete,
    updateTodoItem,
    deleteTodoItem,
    theme,
    toggleTheme,
    reorder,
    clearCompleted,
  };
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, ContextProvider };
