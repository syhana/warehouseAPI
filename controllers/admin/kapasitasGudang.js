const KapasitasGudang = require("../../models/kapasitasGudang");
const BarangMasuk = require("../../models/barang/BarangMasuk");
const BarangKeluar = require("../../models/barang/BarangKeluar");
const Warehouse = require("../../models/gudang");

// const initializeCapacity = async () => {
//   const kapasitas = await KapasitasGudang.findOne({ where: { id: 1 } });
//   if (!kapasitas) {
//     await KapasitasGudang.create({
//       total_kapasitas: 1000,
//       kapasitas_terpakai: 0,
//       sisa_kapasitas: 1000,
//     });
//   }
// };

// initializeCapacity();

// Menambahkan item di kapasitas gudang
const GudangController = {
  tambahkanBarang: async (req, res) => {
    try {
      const { nama_barang, jumlah } = req.body;
      const kapasitas = await KapasitasGudang.findOne({ where: { id: 1 } });

      if (kapasitas.sisa_kapasitas < jumlah) {
        return res
          .status(400)
          .json({ error: "Tidak ada kapasitas tersedia di gudang!" });
      }

      const barang = await Warehouse.findOne({ where: { nama_barang } });

      if (barang) {
        barang.jumlah += jumlah;
        await barang.save();
      } else {
        await Warehouse.create({ nama_barang, jumlah });
      }

      await BarangMasuk.create({ nama_barang, jumlah });

      kapasitas.kapasitas_terpakai += jumlah;
      kapasitas.sisa_kapasitas -= jumlah;
      await kapasitas.save();

      res.status(200).json({
        message: "barang berhasil ditambahkan",
        sisa_kapasitas: kapasitas.sisa_kapasitas,
        penyimpanan: await Warehouse.findAll(),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Kapasitas Gudang hapus barang
  hapusBarang: async (req, res) => {
    try {
      const { nama_barang, jumlah } = req.body;
      const barang = await Warehouse.findOne({ where: { nama_barang } });
      const kapasitas = await KapasitasGudang.findOne({ where: { id: 1 } });

      if (!barang || barang.jumlah < jumlah) {
        return res
          .status(400)
          .json({ error: "Tidak cukup barang dalam stok!" });
      }

      barang.jumlah -= jumlah;
      if (barang.jumlah === 0) {
        await barang.destroy();
      } else {
        await barang.save();
      }

      await BarangKeluar.create({ nama_barang, jumlah });

      kapasitas.kapasitas_terpakai -= jumlah;
      kapasitas.sisa_kapasitas += jumlah;
      await kapasitas.save();

      res.status(200).json({
        message: "Item removed successfully.",
        sisa_kapasitas: kapasitas.sisa_kapasitas,
        inventory: await Warehouse.findAll(),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Get Penyimpanan
    getInventory: async (req, res) => { 
    try {
      const penyimpanan = await Warehouse.findAll();
      const kapasitas = await KapasitasGudang.findOne({ where: { id: 1 } });
  
      res.status(200).json({
        penyimpanan,
        sisa_kapasitas: kapasitas.sisa_kapasitas,
      });
    } catch (error) {
      res.status(500).json({ error: error.messsage});
    }
  },

  getBarangMasukHistory: async (req, res) => {
    try {
        const history = await BarangMasuk.findAll();
        res.status(200).json({ history });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  getBarangKeluarHistory: async (req, res) => {
    try {
        const history = await BarangKeluar.findAll();
        res.status(200).json({ history });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },
};

module.exports = GudangController;

// //Get Penyimpanan
// getInventory: async (req, res) => {
//   try {
//     const penyimpanan = await KapasitasGudang.findAll();
//     const kapasitas = await KapasitasGudang.findOne({ where: { id: 1 } });

//     res.status(200).json({
//       penyimpanan,
//       sisa_kapasitas: kapasitas.sisa_kapasitas,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.messsage});
//   }
// },

// // Menambahkan kapasitas gudang
// const addKapasitasGudang = async (req, res) => {
//   try {
//     const { total_kapasitas } = req.body;

//     if (!total_kapasitas) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Total kapasitas harus diisi" });
//     }

//     const kapasitasGudang = await KapasitasGudang.create({
//       total_kapasitas,
//       sisa_kapasitas: total_kapasitas, // Sisa kapasitas awal sama dengan total kapasitas
//     });

//     return res.status(201).json({ success: true, data: kapasitasGudang });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Kesalahan server" });
//   }
// };

// // Menambah barang masuk dan memperbarui kapasitas
// const addIncomingGoods = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Jumlah barang masuk harus lebih dari 0",
//       });
//     }

//     const kapasitasGudang = await KapasitasGudang.findOne({ where: { id: 1 } }); // Mengambil kapasitas gudang

//     if (kapasitasGudang) {
//       const newUsedCapacity = kapasitasGudang.kapasitas_terpakai + amount;
//       const newRemainingCapacity =
//         kapasitasGudang.total_kapasitas - newUsedCapacity;

//       if (newRemainingCapacity < 0) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Kapasitas gudang tidak cukup" });
//       }

//       await KapasitasGudang.update(
//         {
//           kapasitas_terpakai: newUsedCapacity,
//           sisa_kapasitas: newRemainingCapacity,
//         },
//         { where: { id: kapasitasGudang.id } }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Barang masuk berhasil ditambahkan",
//         data: kapasitasGudang,
//       });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, message: "Kapasitas gudang tidak ditemukan" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Kesalahan server" });
//   }
// };

// // Mengurangi barang keluar dan memperbarui kapasitas
// const removeOutgoingGoods = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Jumlah barang keluar harus lebih dari 0",
//       });
//     }

//     const kapasitasGudang = await KapasitasGudang.findOne({ where: { id: 1 } }); // Mengambil kapasitas gudang

//     if (kapasitasGudang) {
//       const newUsedCapacity = Math.max(
//         0,
//         kapasitasGudang.kapasitas_terpakai - amount
//       ); // Mencegah kapasitas negatif
//       const newRemainingCapacity =
//         kapasitasGudang.total_kapasitas - newUsedCapacity;

//       await KapasitasGudang.update(
//         {
//           kapasitas_terpakai: newUsedCapacity,
//           sisa_kapasitas: newRemainingCapacity,
//         },
//         { where: { id: kapasitasGudang.id } }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Barang keluar berhasil dikurangi",
//         data: kapasitasGudang,
//       });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, message: "Kapasitas gudang tidak ditemukan" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Kesalahan server" });
//   }
// };

// // Melihat kapasitas gudang
// const getKapasitasGudang = async (req, res) => {
//   try {
//     const kapasitasGudang = await KapasitasGudang.findOne({ where: { id: 1 } }); // Mengambil kapasitas gudang

//     if (!kapasitasGudang) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Kapasitas gudang tidak ditemukan" });
//     }

//     return res.status(200).json({ success: true, data: kapasitasGudang });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Kesalahan server" });
//   }
// };

// // Ekspor fungsi controller
// module.exports = {
//   addKapasitasGudang,
//   addIncomingGoods,
//   removeOutgoingGoods,
//   getKapasitasGudang,
// };
