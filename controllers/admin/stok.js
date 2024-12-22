const modelBarang = require('../../models/barang')

//seluruh data stok barang
const allStokBarang = async (req,res) => {
    try {
        const dataStokBarang = await modelBarang.findAll({
            attributes: ['nama_barang', 'stok']
        })
        if (dataStokBarang.length <= 0) {
            return res.status(400).json({success: false, message: 'Data stok barang belum tersedia'})
        }    
        return res.status(200).json({success: true, message: 'Data stok barang tersedia', data: dataStokBarang})    
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
}

//detail stok barang
const detailStokBarang = async (req,res) => {
    try {
        const {id_barang} = req.params
        const findBarang = await modelBarang.findByPk(id_barang, {
            attributes: ['nama_barang', 'stok']
        })
        if (!findBarang) {
            return res.status(400).json({success: false, message: 'Data stok barang tidak ditemukan'})
        }
        return res.status(200).json({success:true, message: 'Data stok barang ditemukan', data: findBarang})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
}

//edit stok barang
const editStok = async (req,res) => {
    try {
        const {id_barang} = req.params
        const {stok} = req.body
        const findBarang = await modelBarang.findByPk(id_barang)
        if (!findBarang) {
            return res.status(400).json({success: false, message: 'Data barang tidak ditemukan'})
        }
        const editBarang = await modelBarang.update({
            stok: stok || findBarang.stok
        }, {
            where:{
                id_barang: id_barang
            }
        })
        if (!editBarang) {
            return res.status(400).json({success: false, message: 'Data barang tidak berhasil diperbaharui'})
        }
        return res.status(200).json({success:true, message: 'Data barang berhasil diperbaharui'})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }    
}

module.exports = {allStokBarang, detailStokBarang,  editStok}