const KapasitasGudang = require('../../models/kapasitasGudang');

// Menambahkan kapasitas gudang
const addKapasitasGudang = async (req, res) => {
    try {
        const { total_kapasitas } = req.body;

        if (!total_kapasitas) {
            return res.status(400).json({ success: false, message: 'Total kapasitas harus diisi' });
        }

        const kapasitasGudang = await KapasitasGudang.create({
            total_kapasitas,
            sisa_kapasitas: total_kapasitas // Sisa kapasitas awal sama dengan total kapasitas
        });

        return res.status(201).json({ success: true, data: kapasitasGudang });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

// Menambah barang masuk dan memperbarui kapasitas
const addIncomingGoods = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Jumlah barang masuk harus lebih dari 0' });
        }

        const kapasitasGudang = await KapasitasGudang.findOne({ where: { id: 1 } }); // Mengambil kapasitas gudang

        if (kapasitasGudang) {
            const newUsedCapacity = kapasitasGudang.kapasitas_terpakai + amount;
            const newRemainingCapacity = kapasitasGudang.total_kapasitas - newUsedCapacity;

            if (newRemainingCapacity < 0) {
                return res.status(400).json({ success: false, message: 'Kapasitas gudang tidak cukup' });
            }

            await KapasitasGudang.update(
                { kapasitas_terpakai: newUsedCapacity, sisa_kapasitas: newRemainingCapacity },
                { where: { id: kapasitasGudang.id } }
            );

            return res.status(200).json({ success: true, message: 'Barang masuk berhasil ditambahkan', data: kapasitasGudang });
        } else {
            return res.status(404).json({ success: false, message: 'Kapasitas gudang tidak ditemukan' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

// Mengurangi barang keluar dan memperbarui kapasitas
const removeOutgoingGoods = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Jumlah barang keluar harus lebih dari 0' });
        }

        const kapasitasGudang = await KapasitasGudang.findOne({ where: { id: 1 } }); // Mengambil kapasitas gudang

        if (kapasitasGudang) {
            const newUsedCapacity = Math.max(0, kapasitasGudang.kapasitas_terpakai - amount); // Mencegah kapasitas negatif
            const newRemainingCapacity = kapasitasGudang.total_kapasitas - newUsedCapacity;

            await KapasitasGudang.update(
                { kapasitas_terpakai: newUsedCapacity, sisa_kapasitas: newRemainingCapacity },
                { where: { id: kapasitasGudang.id } }
            );

            return res.status(200).json({ success: true, message: 'Barang keluar berhasil dikurangi', data: kapasitasGudang });
        } else {
            return res.status(404).json({ success: false, message: 'Kapasitas gudang tidak ditemukan' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

// Melihat kapasitas gudang
const getKapasitasGudang = async (req, res) => {
    try {
        const kapasitasGudang = await KapasitasGudang.findOne({ where: { id: 1 } }); // Mengambil kapasitas gudang

        if (!kapasitasGudang) {
            return res.status(404).json({ success: false, message: 'Kapasitas gudang tidak ditemukan' });
        }

        return res.status(200).json({ success: true, data: kapasitasGudang });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Kesalahan server' });
    }
};

// Ekspor fungsi controller
module.exports = {
    addKapasitasGudang,
    addIncomingGoods,
    removeOutgoingGoods,
    getKapasitasGudang
};