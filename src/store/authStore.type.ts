export interface iAuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  tokenExpiryDate: number;
  setIsLoggedIn: (value: boolean) => void;
  setAccessToken: (value: string, date: number) => void;
  clearToken: () => void;
}
