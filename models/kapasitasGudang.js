// models/KapasitasGudang.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const KapasitasGudang = sequelize.define('KapasitasGudang', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total_kapasitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Total kapasitas gudang dalam satuan yang sesuai (misalnya, unit, liter, dll.)"
    },
    kapasitas_terpakai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Kapasitas yang sudah terpakai"
    },
    sisa_kapasitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Sisa kapasitas yang tersedia"
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'kapasitas_gudang',
    timestamps: true,
});

// Sinkronisasi model dengan database
sequelize.sync();

module.exports = KapasitasGudang;