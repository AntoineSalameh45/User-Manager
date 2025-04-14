import { create } from "zustand";
import { persist } from "zustand/middleware";
import { iAuthStore } from "./authStore.type";

const useSessionStore = create<iAuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      tokenExpiryDate: 0,
      setIsLoggedIn: (value: boolean) =>
        set({ isLoggedIn: value }),
      setAccessToken: (value: string, date: number) =>
        set({
          accessToken: value,
          tokenExpiryDate: date,
        }),
        clearToken: () => {
          set({
            isLoggedIn: false,
            accessToken: null,
            tokenExpiryDate: 0,
          });
        
          // Remove persisted state manually
          window.localStorage.removeItem("user-session");
          console.log("Cleared session and local storage.");
        },        
    }),
    {
      name: "user-session",
    }
  )
);

export default useSessionStore;
