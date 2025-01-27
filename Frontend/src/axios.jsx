import axios from "axios";

const instance = axios.create({
  baseURL: "https://goaltracker-jkh3.onrender.com/todos",
});

// Add an interceptor to include the token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get the token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
  }
  return config;
});

export default instance;
