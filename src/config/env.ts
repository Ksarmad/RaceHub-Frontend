const getEnv = () => {
  const API_BASE_URL =
    (import.meta.env.VITE_API_URL as string | undefined) ||
    "http://localhost:5000/api";

  const FRONTEND_BASE_URL =
    (import.meta.env.VITE_FRONTEND_URL as string | undefined) ||
    "http://localhost:5173";

  return {
    API_BASE_URL,
    FRONTEND_BASE_URL,
    REGISTRATION_URL: `${FRONTEND_BASE_URL}/register`,
  };
};

export const env = getEnv();

