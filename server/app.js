if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 3000;
const gemini = require("./helpers/geminiAi");
const router = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Hanya izinkan akses dari Vite
    methods: "GET, POST, PUT, DELETE",
    credentials: true, // Jika menggunakan cookie/token
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(requestActivity);
app.use(router);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
