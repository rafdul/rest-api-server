const Concert = require('../concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Concert', () => {

  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      // const uri = await fakeDB.getConnectionString();
      const uri = await fakeDB.getUri();
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  });

  after(() => {
    mongoose.models = {};
  });

  describe('Reading data', () => {

    beforeEach(async () => {
      const testOne = new Concert({performer: 'band1', genre: 'rock1', price: 1, day: 1, image: 'photo1'});
      await testOne.save();
  
      const testTwo = new Concert({performer: 'band2', genre: 'rock2', price: 22, day: 2, image: 'photo2'});
      await testTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      // console.log(concerts)
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });

    it('should return a proper document with "findOne" method', async () => {
      const concert = await Concert.findOne({ performer: 'band1' });
      const expectedGenre = 'rock1';
      expect(concert.genre).to.be.equal(expectedGenre);
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const concert = new Concert({performer: 'band3', genre: 'rock3', price: 33, day: 3, image: 'photo3'});
      await concert.save();
      const result = await Concert.findOne({ performer: 'band3' });
      expect(result).to.exist;
    });

    after(async () => {
      await Concert.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testOne = new Concert({performer: 'band1', genre: 'rock1', price: 11, day: 1, image: 'photo1'});
      await testOne.save();
  
      const testTwo = new Concert({performer: 'band2', genre: 'rock2', price: 22, day: 2, image: 'photo2'});
      await testTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Concert.updateOne({genre: 'rock1'}, { $set: {performer: '##band1##'}});
      const con = await Concert.findOne({performer: '##band1##'}); 
      expect(con).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const con = await Concert.findOne({performer: 'band2'}); 
      con.price = 200;
      await con.save();
      const updatedCon = await Concert.findOne({price: 200});
      expect(updatedCon).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Concert.updateMany({ $set: {day: 10}});
      const con = await Concert.find({ day: 10 }); 
      expect(con).to.not.be.null;
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testOne = new Concert({performer: 'band1', genre: 'rock1', price: 11, day: 1, image: 'photo1'});
      await testOne.save();
  
      const testTwo = new Concert({performer: 'band2', genre: 'rock2', price: 22, day: 2, image: 'photo2'});
      await testTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Concert.deleteOne({ performer: 'band1' });
      const deletedCon = await Concert.findOne({ image: 'photo1' });
      expect(deletedCon).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const con = await Concert.findOne({genre: 'rock2'}); 
      await con.remove();
      const deletedCon = await Concert.findOne({performer: 'band2'});
      expect(deletedCon).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Concert.deleteMany();
      const deletedCon = await Concert.find();
      const expectedLength = 0;
      expect(deletedCon.length).to.be.equal(expectedLength);
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });
});