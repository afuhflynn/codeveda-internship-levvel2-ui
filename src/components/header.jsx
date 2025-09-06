import { useContext, useRef, useState } from "react";
import { GlobalContext } from "./providers/context-provider";

const Header = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const { theme, toggleTheme, createTodo } = useContext(GlobalContext);
  const addTodo = async () => {
    try {
      await createTodo(input);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo(input);
    inputRef.current?.focus();
  };

  return (
    <header className="hero">
      <div className="container">
        <h1 className="logo">TODO</h1>
        <button
          aria-label="Toggle theme"
          className="icon-btn"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>

      <form className="new-todo" onSubmit={handleSubmit}>
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
  );
};

export default Header;
