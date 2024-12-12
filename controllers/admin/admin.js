const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const modelAdmin = require('../../models/admin')
const modelTokenAdmin = require('../../models/token_admin')

//tambah admin
const tambahAdmin = async (req,res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi inputan anda'})
        } 
        const findUser = await modelAdmin.findOne({where: {username: username}})
        if (findUser) {
            return res.status(400).json({success: false, message: 'Username telah digunakan'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password, salt)
        const addAdmin = await modelAdmin.create({
            username: username,
            password: hashedPass
        })
        if (!addAdmin) {
            return res.status(400).json({success: false, message: 'Akun admin tidak berhasil ditambahkan'})
        }
        return res.status(200).json({success: true, message: 'Akun admin berhasil ditambahkan'})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }

}

//login admin
const loginAdmin = async (req,res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi data akun anda'})
        }
        const findUser = await modelAdmin.findOne({where: {username: username}})
        if (!findUser) {
            return res.status(400).json({success: false, message: 'Username akun tidak ditemukan'})
        }
    
        bcrypt.compare(password, findUser.password, async (err, results) => {
            if (err || !results) {
                return res.status(400).json({success: false, message: 'Password akun anda salah'})
            }
            const id_admin = findUser.id_admin
            const token = jwt.sign(
                {
                     id_admin
                },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1w'
                }
            )
            await modelTokenAdmin.create({
                token: token,
                id_admin: id_admin
            })
            return res.status(200).json({success: true, message: 'Login berhasil', token: token})
        })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: 'Kesalahan server'})
    }
    
}

//logout admin
const logoutAdmin = async (req,res) => {
    try {
        const authHeader = req.get('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ succes: false, message: 'Tidak ada token atau sudah logout sebelumnya' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
              return res.status(401).json({ succes: false, message: err });
            }

            const adaToken = await modelTokenAdmin.findOne({where: {token}})
            if (!adaToken) {
                return res.status(401).json({ succes: false, message: "Tidak ada token atau sudah logout sebelumnya" });
            }
            
            await modelTokenAdmin.destroy({ where: {token}});
        
            res.status(200).json({ success: true, message: 'Logout berhasil' });
        });        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Kesalahan server'})
    }
}

module.exports = {tambahAdmin, loginAdmin, logoutAdmin}