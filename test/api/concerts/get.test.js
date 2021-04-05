const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');
const Workshop = require('../../../models/workshop.model');
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

    const ticketOne = new Seat({_id:'aa777140f10a81216cfd77aa', day: 1, seat: 1, client:'Jeff', email:'jeff@pl.pl'});
    await ticketOne.save();

    const ticketTwo = new Seat({_id:'bb777140f10a81216cfd77bb', day: 1, seat: 2, client:'Amanda', email:'amanda@pl.pl'});
    await ticketTwo.save();

    const ticketThree = new Seat({_id:'cc777140f10a81216cfd77cc', day: 2, seat: 3, client:'Ron', email:'ron@pl.pl'});
    await ticketThree.save();

    const workOne = new Workshop({name: 'Workshop1', concertId: testOne._id});
    await workOne.save();

    const workTwo = new Workshop({name: 'Workshop2', concertId: testTwo._id});
    await workTwo.save();

    const workThree = new Workshop({name: 'Workshop2', concertId: testThree._id});
    await workThree.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    // console.log('res.body[0].concert.performer', res.body[0].concert.performer);
    const expectedLength = 4;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].concert.performer).to.be.equal('band4');
    expect(res.body.length).to.be.equal(expectedLength);
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/44444140f10a81216cfd4444');
    // console.log('res.body.workshops', res.body.workshops[0].name);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object').to.have.property('concert' && 'workshops' && 'freeTickets');
    expect(res.body.workshops[0].name).to.be.equal('Workshop1');
    expect(res.body).to.not.be.null;
  });

  it('/:id/tickets should return one concert by :id and free tickets', async () => {
    const res = await request(server).get('/api/concerts/55555140f10a81216cfd5555/tickets');
    // console.log('res.body.concert.day:', res.body.concert.day);
    const tick = await Seat.find({day: res.body.concert.day})
    const freeTickets = 50 - tick.length;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object').to.have.property('concert' && 'workshops' && 'freeTickets');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer should return one concert by :performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/band4');
    expect(res.status).to.be.equal(200);
    // console.log('res.body w perforemr', res.body);
    const expectedLength = 2
    expect(res.body).to.be.an('array').to.have.lengthOf(expectedLength);
    expect(res.body[0].freeTickets).to.be.equal(48);
    expect(res.body[0].workshops.length).to.be.equal(1);
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
    // console.log('res.body w day', res.body);
    const expectedLength = 2;
    expect(res.body).to.be.an('array').to.have.lengthOf(expectedLength);
    expect(res.body[0].freeTickets).to.be.equal(49);
    expect(res.body[0].workshops.length).to.be.equal(1);
    expect(res.body[0]).to.be.an('object').to.have.property('concert' && 'workshops' && 'freeTickets');
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
    await Seat.deleteMany();
    await Workshop.deleteMany();
  });  
});