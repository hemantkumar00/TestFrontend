import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Adjust the URL based on your backend API URL
});
//
export default api;
