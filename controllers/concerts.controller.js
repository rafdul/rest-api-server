const Concert = require('../models/concert.model');

const confirmation = { message: 'OK'};

function statusError(res, err) {
  res.status(500).json({ message: 'error', data: err });
};

function statusNotFound(res) {
  res.status(404).json({ message: 'Not found' });
}

exports.getConcertAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getConcertById = async (req, res) => {
  try {
    const tes = await Concert.findById(req.params.id);
    if(!tes) statusNotFound(res);
    else res.json(tes);
  }
  catch(err) {
    statusError(res, err);
  }
};

exports.getConcertByPerformer = async (req, res) => {
  try {
    const performer = await Concert.find({performer: req.params.performer});
    if(!performer) statusNotFound(res);
    else res.json(performer);
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
    const day = await Concert.find({day: req.params.day});
    if(!day) statusNotFound(res);
    else res.json(day);
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
    const { performer, genre, price, day, image} = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
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