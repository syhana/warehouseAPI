// models/barang_keluar.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db') // Sesuaikan dengan konfigurasi Anda

const BarangKeluar = sequelize.define('BarangKeluar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_barang: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal_keluar: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    // Tambahkan atribut lain yang diperlukan
}, {
    tableName: 'barang_keluar',
    timestamps: false
});

module.exports = BarangKeluar;
