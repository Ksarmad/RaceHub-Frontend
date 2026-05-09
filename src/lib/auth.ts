const TOKEN_KEY = "admin_token";

export const authStorage = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
};