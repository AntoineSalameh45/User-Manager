import { create } from "zustand";
import { persist } from "zustand/middleware";

interface iThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<iThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: "theme-preference",
    }
  )
);

export default useThemeStore;
