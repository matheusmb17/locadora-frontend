import axios from "axios";
import Auth from "@/services/auth";

const api = axios.create({
  baseURL: "https://localhost:7126/api/",
});

api.interceptors.request.use((config) => {
  const token = Auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
   (error) => {
    if (error.status == "ERR_NETWORK") {
      Auth.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
