import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved preference in localStorage
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);

    if (savedMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Save preference in localStorage
    localStorage.setItem("darkMode", (!isDarkMode).toString());

    if (!isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-600"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
}
