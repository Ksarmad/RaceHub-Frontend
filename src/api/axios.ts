import axios from "axios";

import { authStorage } from "../lib/auth";

import { env } from "../config/env";

const api = axios.create({
  baseURL: env.API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token =
    authStorage.getToken();

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default api;