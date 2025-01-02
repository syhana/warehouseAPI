const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const Kategori = require('./Kategori/kategori');

const barang = sequelize.define('barang', {
    id_barang:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nama_barang:{
        type: DataTypes.STRING(256),
        allowNull:false
    },
    stok: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    },
    harga: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    },
    id_kategori: {
      type: DataTypes.INTEGER,
      references: {
        model: Kategori,
        key: 'id',
      },
      allowNull: false,
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName:'barang',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

barang.belongsTo(Kategori, { foreignKey: 'id_kategori', as: 'kategori' });

sequelize.sync();

module.exports = barang