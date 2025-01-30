import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Sesuaikan dengan server Express
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Jika menggunakan cookie/token
});

export default instance;
