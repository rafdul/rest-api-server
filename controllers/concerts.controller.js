const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');
const Workshop = require('../models/workshop.model');
const sanitize = require('mongo-sanitize');

const confirmation = { message: 'OK'};

function statusError(res, err) {
  res.status(500).json({ message: 'error', data: err });
};

function statusNotFound(res) {
  res.status(404).json({ message: 'Not found' });
}

exports.getConcertAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const workshops = await Workshop.find();
    
    const allConcerts = [];
    for(let con of concerts){
      const result = workshops.filter(el => el.concertId == con._id);
      const output = {concert: con, workshops: result};
      allConcerts.push(output);
    }
    res.json(allConcerts);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    const workshops = await Workshop.find({concertId: concert._id});
    const tickets = await Seat.find({day: concert.day});
    const freeTickets = 50 - tickets.length;
    if(!concert) statusNotFound(res);
    else res.json({concert: concert, freeTickets: freeTickets, workshops: workshops});
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getTicketsOfConcerts = async(req,res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    const workshops = await Workshop.find({concertId: concert._id});
    const tickets = await Seat.find({day: concert.day});
    const freeTickets = 50 - tickets.length;
    if(!concert) statusNotFound(res);
    else res.json({concert: concert, freeTickets: freeTickets, workshops: workshops});
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getConcertByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({performer: req.params.performer});
    const workshops = await Workshop.find();
    const tickets = await Seat.find();
    
    const allConcerts = [];
    for(let con of concerts){
      const result = workshops.filter(el => el.concertId == con._id);
      const ticketsByDay = tickets.filter(el => el.day == con.day).length;
      const freeTickets = 50 - ticketsByDay;
      const output = {concert: con, freeTickets: freeTickets, workshops: result};
      allConcerts.push(output);
    }
    if(!concerts) statusNotFound(res);
    else res.json(allConcerts);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getConcertByGenre = async (req, res) => {
  try {
    const genre = await Concert.find({genre: req.params.genre});
    if(!genre) statusNotFound(res);
    else res.json(genre);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getConcertByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({day: req.params.day});
    const workshops = await Workshop.find();
    const tickets = await Seat.find();
    
    const allConcerts = [];
    for(let con of concerts){
      const result = workshops.filter(el => el.concertId == con._id);
      const ticketsByDay = tickets.filter(el => el.day == con.day).length;
      const freeTickets = 50 - ticketsByDay;
      const output = {concert: con, freeTickets: freeTickets, workshops: result};
      allConcerts.push(output);
    }
    if(!concerts) statusNotFound(res);
    else res.json(allConcerts);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getConcertByPrice = async (req, res) => {
  try {
    const concerts = await Concert.find({$and:[{price: {$gte: req.params.price_min}}, {price: {$lte: req.params.price_max}}]});
    if(!concerts) statusNotFound(res);
    else res.json(concerts);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.post = async (req, res) => {
  try {
    let cleanPerform = sanitize(req.body.performer);
    let cleanGenre = sanitize(req.body.genre);
    let cleanImage = sanitize(req.body.image);
    const { performer, genre, price, day, image} = req.body;
    const newConcert = new Concert({ performer: cleanPerform, genre: cleanGenre, price: req.body.price, day: day, image: cleanImage });
    await newConcert.save();
    res.json(confirmation);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.putId = async (req, res) => {
  try {
    const { performer, genre, price, day, image} = req.body;
    const tes = await(Concert.findById(req.params.id));
    if(tes) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json(confirmation);
    }
    else statusNotFound(res);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.deleteId = async (req, res) => {
  try {
    const tes = await(Concert.findById(req.params.id));
    if(tes) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(confirmation);
    }
    else statusNotFound(res);
  }
  catch(err) {
    statusError(res, err);
  }
};