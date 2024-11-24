import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
};

type AuthAction = {
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
