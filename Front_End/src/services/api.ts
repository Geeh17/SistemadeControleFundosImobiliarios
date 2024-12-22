import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", 
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token && config.headers) {
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
