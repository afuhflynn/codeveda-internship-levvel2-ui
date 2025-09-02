import { useState } from "react";
import { LS_THEME } from "../constants";
import { prefersDark } from "../utils";
import { useEffect } from "react";

export default function useTheme() {
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
