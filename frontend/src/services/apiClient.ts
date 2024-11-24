import axios from "axios";

import { API_URL } from "@/configs/env";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Bearer token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or wherever you store it
    const token = localStorage.getItem("authToken"); // Replace with your method of storing token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
