import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  email: string;
  name: string;
};

type AuthAction = {
  login: (state: Omit<AuthState, "isAuthenticated">) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  isAuthenticated: false,
  email: "",
  name: "",
  login: (state) => set({ ...state, isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, email: "", name: "" }),
}));

export default useAuthStore;
