// models/barang_masuk.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db') // Sesuaikan dengan konfigurasi Anda

const BarangMasuk = sequelize.define('BarangMasuk', {
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
    tanggal_masuk: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    // Tambahkan atribut lain yang diperlukan
}, {
    tableName: 'barang_masuk',
    timestamps: false
});

module.exports = BarangMasuk;
