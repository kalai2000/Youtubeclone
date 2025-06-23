// // src/axiosConfig.js
// import axios from "axios";

// const instance = axios.create({
//   baseURL: VITE_BASE_URL || "http://localhost:8800", //  Your backend URL
//   withCredentials: true, // Optional: if using cookies
// });

// export default instance;


// export const BASEURL = import.meta.env.VITE_BASE_URL;



// src/axiosConfig.js
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL || "http://localhost:8800";

const instance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export default instance;
export { BASEURL };