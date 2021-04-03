const Concert = require('../models/concert.model');

const confirmation = { message: 'OK'};

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const tes = await Concert.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPerformer = async (req, res) => {
  try {
    const performer = await Concert.find({performer: req.params.performer});
    if(!performer) res.status(404).json({ message: 'Not found' });
    else res.json(performer);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const genre = await Concert.find({genre: req.params.genre});
    if(!genre) res.status(404).json({ message: 'Not found' });
    else res.json(genre);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => {
  try {
    const day = await Concert.find({day: req.params.day});
    if(!day) res.status(404).json({ message: 'Not found' });
    else res.json(day);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const concertsPrice = [];
    for(let el of concerts) {
      if(el.price >= req.params.price_min && el.price <= req.params.price_max){
        concertsPrice.push(el);
      }
    }
    if(concertsPrice.length < 1) res.status(404).json({ message: 'Not found' });
    else res.json(concertsPrice);

    // const price = await Concert.find({price: req.params.price >= priceMin && req.params.price <= priceMax});
    // if(!price) res.status(404).json({ message: 'Not found' });
    // else res.json(price);
  }
  catch(err) {
    res.status(500).json({ message: err });
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
    res.status(500).json({ message: err });
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
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  try {
    const tes = await(Concert.findById(req.params.id));
    if(tes) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(confirmation);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};