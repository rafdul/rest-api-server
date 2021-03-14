const express = require('express');
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
  db.seats.push({
    id: uniqid(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  });
  // res.json(req.body);
  res.json(confirmation);
});

router.route('/seats/:id').put((req, res) => {
  const updatedItem = ({
    id: req.params.id,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  });
  const itemToUpdate = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(itemToUpdate);
  db.seats[index] = updatedItem;
  res.json(confirmation);
});

router.route('/seats/:id').delete((req, res) => {
  const deletedItem = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(deletedItem);
  db.seats.splice(index, 1);
  res.json(confirmation);
});

module.exports = router;