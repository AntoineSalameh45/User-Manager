import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import { Routes } from "./routes";

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  return (
    <Routes />
  );
}

export default App;
