import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

API.interceptors.request.use((config) => {
  const storage = localStorage.getItem("auth-storage");

  if (storage) {
    const parsed = JSON.parse(storage);

    const token = parsed.state.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;
