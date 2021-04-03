const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const mongoose = require('mongoose');


chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

after(() => {
  mongoose.models = {};
});

describe('GET /api/concerts', () => {

  before(async () => {
    const testOne = new Concert({_id: '44444140f10a81216cfd4444', performer: 'band4', genre: 'rock', price: 44, day: 1, image: '/img/uploads/350327.jpg'});
    await testOne.save();

    const testTwo = new Concert({_id: '55555140f10a81216cfd5555', performer: 'band5', genre: 'rock', price: 55, day: 2, image: '/img/uploads/811838.jpg'});
    await testTwo.save();

    const testThree = new Concert({_id: '66666140f10a81216cfd6666', performer: 'band4', genre: 'pop', price: 66, day: 2, image: '/img/uploads/3018077.jpg'});
    await testThree.save();

    const testFour = new Concert({_id: '77777140f10a81216cfd7777', performer: 'band3', genre: 'pop', price: 33, day: 3, image: '/img/uploads/167483.jpg'});
    await testFour.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    // console.log(res.body);
    const expectedLength = 4;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(expectedLength);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/44444140f10a81216cfd4444');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object').to.have.deep.property('performer', 'band4');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer should return one concert by :performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/band4');
    expect(res.status).to.be.equal(200);
    // console.log(res.body);
    const expectedLength = 2
    expect(res.body).to.be.an('array').to.have.lengthOf(expectedLength);
    expect(res.body).to.not.be.null;
  });

  it('/genre/:genre should return one concert by :genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/rock');
    expect(res.status).to.be.equal(200);
    // console.log(res.body);
    const expectedLength = 2;
    expect(res.body).to.be.an('array').to.have.lengthOf(expectedLength);
    expect(res.body).to.not.be.null;
  });

  it('/price/day/:day should return one concert by :day ', async () => {
    const res = await request(server).get('/api/concerts/price/day/2');
    expect(res.status).to.be.equal(200);
    // console.log(res.body);
    const expectedLength = 2;
    expect(res.body).to.be.an('array').to.have.lengthOf(expectedLength);
    expect(res.body).to.not.be.null;
  });

  it('price/:price_min/:price_max should return one concert by price ', async () => {
    const price_min = 30; 
    const price_max = 60;
    const res = await request(server).get(`/api/concerts/price/${price_min}/${price_max}`);
    // console.log(res.body);
    const expectedLength = 3;
    expect(res.body).to.be.an('array').to.have.lengthOf(expectedLength);
    expect(res.body).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });  
});