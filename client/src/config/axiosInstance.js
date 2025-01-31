import axios from "axios";

const instance = axios.create({
  baseURL: "https://server.andreasuryatanaya.my.id/", // Sesuaikan dengan server Express
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Jika menggunakan cookie/token
});

export default instance;
