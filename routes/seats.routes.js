const express = require('express');
const router = express.Router();
// var uniqid = require('uniqid');
// const db = require('../db.js');
const Seat = require('../models/seat.model');

const confirmation = { message: 'OK'};

router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const tes = await Seat.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/seats', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json(confirmation);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.route('/seats').post((req, res) => {
  const newBooking = {
    id: uniqid(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  // res.json(req.body);
  if(db.seats.some(item => item.seat === newBooking.seat && item.day === newBooking.day)) {
    res.json({ message: "The slot is already taken..." });
  } else {
    db.seats.push(newBooking);
    req.io.emit('seatsUpdated', db.seats);
    // req.io.emit('numberOfTickets', db.seats.length);
    res.json(confirmation);
  }
});



router.route('/seats/:id').put((req, res) => {
  const updatedItem = ({
    id: req.params.id,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  });
  const itemToUpdate = db.seats.findIndex(item => item.id == req.params.id);
  db.seats[itemToUpdate] = updatedItem;
  res.json(confirmation);
});


router.delete('/seats/:id', async (req, res) => {
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
});

module.exports = router;