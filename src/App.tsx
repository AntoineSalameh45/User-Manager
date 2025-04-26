import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import { Routes } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            success: {
              style: {
                background: "#4caf50",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#f44336",
                color: "#fff",
              },
            },
          }}
        />
        <Routes />
      </QueryClientProvider>
    </>
  );
}

export default App;
