import axios from "./api"; 

interface LoginResponse {
  token: string; 
}

export const login = async (email: string, senha: string) => {
  const response = await axios.post<LoginResponse>("/auth/login", { email, senha });
  localStorage.setItem("token", response.data.token); 
};

export const googleLoginUrl = "http://localhost:3000/auth/google";
