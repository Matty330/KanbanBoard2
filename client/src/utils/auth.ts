export const AuthService = {
  login: async (username: string, password: string) => {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      return data;
  },

  logout: () => {
      localStorage.removeItem("token");
  },

  getToken: () => {
      return localStorage.getItem("token");
  },

  isAuthenticated: () => {
      return !!localStorage.getItem("token");
  },
};
