const Seat = require('../models/seat.model');

const confirmation = { message: 'OK'};

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const tes = await Seat.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const tes = await(Seat.findById(req.params.id));
    if(tes) {
      res.json({ message: "The slot is already taken..." });
    } else {
      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      req.io.emit('seatsUpdated', (await Seat.find()))
      res.json(confirmation);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const tes = await(Seat.findById(req.params.id));
    if(tes) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
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
    const tes = await(Seat.findById(req.params.id));
    if(tes) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(confirmation);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};