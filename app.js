// app.js
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");

const server = require("./routes/index"); // Pastikan path ini benar

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/", server.admin);
app.use("/", server.barang);
app.use("/", server.stok);
app.use("/", server.riwayat);
app.use("/", server.kategori);
// Handler 404
app.use(function (req, res, next) {
  // Alih-alih mencoba merender view, kirimkan respons JSON
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

// Handler error khusus Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next(err);
});

// Handler error umum
app.use(function (err, req, res, next) {
  // Kirimkan respons JSON dengan status error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Kesalahan server",
  });
});

module.exports = app;
