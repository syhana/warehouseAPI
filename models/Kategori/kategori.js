// models/Kategori/kategori.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
// Sesuaikan jalur import dengan lokasi file config/database.js

const Kategori = sequelize.define(
  "Kategori",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "kategori", // nama tabel di DB
    timestamps: false, // matikan createdAt, updatedAt jika tidak perlu
  }
);

module.exports = Kategori;
