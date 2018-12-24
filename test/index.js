const chai = require('chai')
var expect = chai.expect;
const chaiHttp =  require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

describe('Users',() => {
    it('Should be Login and Get Token',() => {
        chai.request(app)
        .post('users/login')
        .send({username: 'admin', password:'admin'})
        .end((err,res) =>{
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res).to.have.property('message')
        expect(res.body.message).to.equal('Success Login')
        expect(res).to.have.property('data')
        expect(res.body.data).to.have.property('token')
        })
    })
    it('Should give error when username or pasword wrong',() => {
        chai.request(app)
        .post('/users/login')
        .send({username: 'admin', password:'adminkepo'})
        .end((err,res) =>{
        expect(res).to.have.status(403)
        expect(res).to.be.json
        expect(res).to.have.property('message')
        expect(res.body.message).to.equal('Invalid Login')
        })
    })
})