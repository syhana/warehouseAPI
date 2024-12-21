const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

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

sequelize.sync();

module.exports = barang