import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.215.248.129/", // Sesuaikan dengan server Express
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Jika menggunakan cookie/token
});

export default instance;
