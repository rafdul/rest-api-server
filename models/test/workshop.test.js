const Workshop = require('../workshop.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Workshop', () => {

  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no arguments', () => {
    const con = new Workshop({});
    con.validate(err => {
      expect(err.errors).to.exist;
    });
  });

  it('should throw an error if there aren`t all arguments', () => {
    const work1 = new Workshop({name: 'bob marley'});
    const work2 = new Workshop({concertId: '1111111111'});

    const cases = [work1, work2];
    for(let variant of cases) {
      const work = new Workshop({variant});
  
      work.validate(err => {
        expect(err.errors.name).to.exist;
        expect(err.errors.concertId).to.exist;
      });
    }
  });

  it('should throw an error if arguments have bad type', () => {
    const work1 = new Workshop({ name: [], concertId: [] });
    const work2 = new Workshop({ name: {}, concertId: {} });
    
    const cases = [work1, work2];
    for(let variant of cases) {
      const work = new Workshop({variant});
  
      work.validate(err => {
        expect(err.errors.name).to.exist;
        expect(err.errors.concertId).to.exist;
      });
    }
  });

  it('should throw good if all arguments are correct', () => {
    const work = new Workshop({name: 'bob marley', concertId: '1111111111'});

    work.validate(err => {
      expect(err).to.not.exist;
    });
  });

  after(async () => {
    await Workshop.deleteMany();
  });
});