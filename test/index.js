const chai = require('chai')
var expect = chai.expect;
const chaiHttp =  require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

var token = ''
describe('Users',() => {
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
    it('Should give error when username or pasword wrong',() => {
        chai.request(app)
        .post('/users/login')
        .send({username: 'elfin', password:'rahasialah'})
        .end((err,res) =>{
        expect(res).to.have.status(403)
        expect(res).to.be.json
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('Invalid Login')
        })
    })
})

var siswaId
describe('Crud Siswa', () => {
    it('Should get Data Siswa', () => {
        chai.request(app)
        .get('/siswas')
        .set('token', token)
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res).to.be.json
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Read Data Siswa')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be('array')
        })
    })
    it('Should Create New Siswa', () => {
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
            done();
        })
    })
    // it('Should Give error when create siswa without auth', function(done) {
    //     chai.request(app)
    //       .post('/siswas')
    //       .send({
    //         nama: 'iwan',
    //         alamat: 'lampung',
    //         kelas: 1     
    //       })
    //       .end(function(err, res) {
    //          expect(res).to.have.status(500);
    //          expect(res).to.be.json;
    //          expect(res.body).to.have.property('message');
    //          expect(res.body.message).to.equal('Invalid Token');
    //          done();
    //       })
    //   })
})