const express = require('express');
// const socket = require('socket.io');
const router = express.Router();
var uniqid = require('uniqid');
const db = require('../db.js');

const confirmation = { message: 'OK'};

router.route('/seats').get((req, res) =>{
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) =>{
  res.json(db.seats.find(item => item.id == req.params.id));
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

router.route('/seats/:id').delete((req, res) => {
  const deletedItem = db.seats.findIndex(item => item.id == req.params.id);
  db.seats.splice(deletedItem, 1);
  res.json(confirmation);
});

module.exports = router;