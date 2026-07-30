import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://auth-integration-backend.onrender.com/api/",
  withCredentials: true,
});

// https://auth-integration-backend.onrender.com

