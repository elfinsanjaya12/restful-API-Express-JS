var express = require('express');
var router = express.Router();
var models = require('../models')
const { checkAuth } = require('../middlewares/auth')
/* GET users listing. */

router.get('/', checkAuth, function(req, res, next) {
  models.Siswa.findAll().then(siswas => {
    res.status(200).json({message: "Read Data Siswa", data: siswas})
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: "Terjadi Kesalahan"})
  })
});


router.delete('/:id', checkAuth, (req, res) => {
  const siswaId = req.params.id
  models.Siswa.findOne({where: {id: siswaId}}).then(siswa => {
    return siswa.destroy()
  }).then(siswa => {
    res.status(200).json({message: "Delete data siswa dengan ID " + siswaId})
  }).catch(err => {
    res.status(500).json({message: "Terjadi Kesalahan"})
  })
})

router.post('/', checkAuth, (req, res) =>{
  const { nama, alamat, kelas } = req.body
  models.Siswa.create({nama, alamat, kelas }).then(siswa => {
    res.status(201).json({message: "Berhasil Simpan data Siswa", data: siswa})
  }).catch(err => {
    res.status(500).json({message: "Invalid Token"})
  })
})

router.put('/:id', checkAuth, (req, res) => {
  const siswaId = req.params.id
  const { nama, alamat, kelas } = req.body
  models.Siswa.findOne({where: {id: siswaId}}).then(siswa => {
    return siswa.update({
      nama,
      alamat,
      kelas
    }).then(updateSiswa => {
      res.status(201).json({message: "Update siswa ", data:updateSiswa})
    }).catch(err => {
      console.log(err)
      res.status(500).json({message: "Terjadi Kesalahan"})
    })
  })
})

module.exports = router;