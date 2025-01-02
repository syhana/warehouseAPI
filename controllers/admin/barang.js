const modelBarang = require('../../models/barang')
const modelKategori = require('../../models/Kategori/kategori')

//tambah barang
const tambahBarang = async(req,res) => {
    try {
        const {nama_barang, stok, harga, id_kategori} = req.body
        if (!nama_barang || !stok || !harga || !id_kategori) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi data barang anda'})
        }
        const findNama = await modelBarang.findOne({where:{nama_barang:nama_barang}})
        if (findNama) {
            return res.status(400).json({success: false, message: 'Data barang dengan nama tersebut sudah tersedia'})
        }
        const kategoriExists = await modelKategori.findByPk(id_kategori);
        if (!kategoriExists) {
            return res
                .status(400)
                .json({ success: false, message: 'Kategori tidak ditemukan' });
        }
        await modelBarang.create({
            nama_barang: nama_barang,
            stok: stok,
            harga: harga,
            id_kategori: id_kategori
        })
        return res.status(200).json({success: true, message: 'Data barang berhasil ditambahkan'})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
    
}

//seluruh data barang
const allDataBarang = async (req,res) => {
    try {
        const dataBarang = await modelBarang.findAll({
            attributes: ['id_barang', 'nama_barang', 'stok', 'harga'],
            include: [
                {
                  model: modelKategori,
                  as: 'kategori',
                  attributes: ['id', 'nama'],
                },
              ]
        })
        if (dataBarang.length <= 0) {
            return res.status(400).json({success: false, message: 'Data barang belum tersedia'})
        }    
        return res.status(200).json({success: true, message: 'Data barang tersedia', data: dataBarang})    
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
}

//detail data barang
const detailBarang = async (req,res) => {
    try {
        const {id_barang} = req.params
        const findBarang = await modelBarang.findByPk(id_barang, {
            attributes: ['id_barang', 'nama_barang', 'stok', 'harga'],
            include: [
                {
                  model: modelKategori,
                  as: 'kategori',
                  attributes: ['id', 'nama'],
                },
              ]
        })
        if (!findBarang) {
            return res.status(400).json({success: false, message: 'Data barang tidak ditemukan'})
        }
        return res.status(200).json({success:true, message: 'Data barang ditemukan', data: findBarang})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
}

//edit data barang
const editBarang = async (req,res) => {
    try {
        const {id_barang} = req.params
        const {nama_barang, stok, harga, id_kategori} = req.body
        const findBarang = await modelBarang.findByPk(id_barang)
        if (!findBarang) {
            return res.status(400).json({success: false, message: 'Data barang tidak ditemukan'})
        }

        if (id_kategori) {
            const kategoriExists = await modelKategori.findByPk(id_kategori);
            if (!kategoriExists) {
              return res
                .status(400)
                .json({ success: false, message: 'Kategori tidak ditemukan' });
            }
          }
        const editBarang = await modelBarang.update({
            nama_barang: nama_barang || findBarang.nama_barang,
            stok: stok || findBarang.stok,
            harga: harga || findBarang.harga,
            id_kategori: id_kategori || findBarang.id_kategori
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

//hapus data barang
const hapusBarang = async (req,res) => {
    try {
        const {id_barang} = req.params
        const findBarang = await modelBarang.findByPk(id_barang)
        if (!findBarang) {
            return res.status(400).json({success: false, message: 'Data barang tidak ditemukan'})
        }
        await modelBarang.destroy({where:{id_barang: id_barang}})
        return res.status(200).json({success: false, message: 'Data barang berhasil dihapus'})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
}

module.exports = {tambahBarang, allDataBarang, detailBarang, editBarang, hapusBarang}