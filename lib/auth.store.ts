import { User } from "@/type";
import { create } from "zustand";
import { getCurrentUser } from "./appwrite";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        set({ user: currentUser.documents[0] as User, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Failed to fetch authenticated user:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
