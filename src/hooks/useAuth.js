import { create } from 'zustand';
import { getToken, getTokenPayload } from '../utils/token';

const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: () => {
    const token = getToken();
    if (token) {
      const payload = getTokenPayload(token);
      set({ user: payload, isAuthenticated: true, isLoading: false });
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: (userData) => {
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateUser: (userData) => {
    set({ user: { ...useAuth.getState().user, ...userData } });
  }
}));

export default useAuth;