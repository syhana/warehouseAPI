const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StatusBarang = sequelize.define('status_barang', {
    id_status: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.ENUM('diproses', 'dikemas', 'dikirim','dibatalkan'), 
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.STRING(256),
        allowNull: true,
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
    tableName: 'status_barang',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// // Definisi relasi disini gan
// StatusBarang.hasMany(BarangKeluar, { foreignKey: 'id_status', as: 'barangKeluar' });
// BarangKeluar.belongsTo(StatusBarang, { foreignKey: 'id_status', as: 'statusBarang' });

sequelize.sync();

module.exports = StatusBarang;
