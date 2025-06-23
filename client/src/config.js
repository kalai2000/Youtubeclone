// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8800", //  Your backend URL
  withCredentials: true, // Optional: if using cookies
});

export default instance;