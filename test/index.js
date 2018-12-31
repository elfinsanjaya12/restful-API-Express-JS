const chai = require('chai')
var expect = chai.expect;
const chaiHttp =  require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

var token = ''
describe('Users',() => {
    // testing user login sukses
    it('Should be Login and Get Token', (done) => {
        chai.request(app)
        .post('/users/login')
        .send({username: 'elfin', password:'rahasia'})
        .end((err,res) =>{
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Success Login')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.have.property('token')
            token = res.body.data.token
            done()
        })
    })
    // test login gagal
    it('Should give error when username or pasword wrong',(done) => {
        chai.request(app)
        .post('/users/login')
        .send({username: 'elfin', password:'rahasialah'})
        .end((err,res) =>{
        expect(res).to.have.status(403)
        expect(res).to.be.json
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('Invalid Login')
        done()
        })
    })
})

var siswaId
describe('Crud Siswa', () => {
    // testing sukses get data all siswa
    it('Should get Data Siswa', (done) => {
        chai.request(app)
        .get('/siswas')
        .set('token', token)
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Read Data Siswa')
            expect(res.body).to.have.property('data')
            done()
        })
    })
    // testing sukses create data siswa
    it('Should Create New Siswa', (done) => {
        chai.request(app)
        .post('/siswas')
        .set('token', token)
        .send({
            nama: 'iwan',
            alamat: 'lampung',
            kelas: 1    
        })
        .end((err, res) => { 
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Berhasil Simpan data Siswa');
            expect(res.body).to.have.property('data');
            siswaId = res.body.data.id
            done()
        })
    })
    it('Should Update Siswa', function(done) {
        chai.request(app)
          .put(`/siswas/${siswaId}`)
          .set('token', token)
          .send({ 
            nama: 'iwan ubah',
            alamat: 'lampung ubah',
            kelas: 1    
          })
          .end(function(err, res) {
             expect(res).to.have.status(201);
             expect(res).to.be.json;
             expect(res.body).to.have.property('message');
             expect(res.body.message).to.equal('Update Siswa');
             expect(res.body).to.have.property('data');
             done();
          })
      })
      it('Should Delete Siswa', function(done) {
        chai.request(app)
          .del(`/siswas/${siswaId}`)
          .set('token', token)
          .end(function(err, res) {
             expect(res).to.have.status(200);
             expect(res).to.be.json;
             expect(res.body).to.have.property('message');
             expect(res.body.message).to.equal('Delete data siswa');
             expect(res.body).to.have.property('data');
             done();
          })
      })
})