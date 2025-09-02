import { useEffect, useState } from "react";

const useLocalTheme = (key: string, newTheme: string) => {
  const [theme, setTheme] = useState<string | null>(() => {
    let storedTheme: string | null = "";
    try {
      storedTheme = localStorage.getItem(key);
      storedTheme = storedTheme ? JSON.parse(storedTheme) : String(newTheme);
    } catch (error: any) {
      console.log("Internal error occured: ", error.message);
    }
    return storedTheme;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(theme));
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add(String(theme));
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add(String(theme));
    }
  }, [key, theme, newTheme]);

  return [String(theme), setTheme];
};

export default useLocalTheme;
