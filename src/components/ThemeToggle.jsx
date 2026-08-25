import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
      title={`Modo ${theme === "dark" ? "claro" : "oscuro"}`}
      className="cursor-pointer rounded-lg border border-gray-300 p-2 text-base leading-none transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
