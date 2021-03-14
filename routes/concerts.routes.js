const express = require('express');
const router = express.Router();
var uniqid = require('uniqid');
const db = require('../db.js');

const confirmation = { message: 'OK'};

router.route('/concerts').get((req, res) =>{
    res.json(db.concerts);
  });
  
  router.route('/concerts/:id').get((req, res) =>{
  res.json(db.concerts.find(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  db.concerts.push({
    id: uniqid(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });
  // res.json(req.body);
  res.json(confirmation);
});

router.route('/concerts/:id').put((req, res) => {
  const updatedItem = ({
    id: req.params.id,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });
  const itemToUpdate = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(itemToUpdate);
  db.concerts[index] = updatedItem;
  res.json(confirmation);
});

router.route('/concerts/:id').delete((req, res) => {
  const deletedItem = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(deletedItem);
  db.concerts.splice(index, 1);
  res.json(confirmation);
});

module.exports = router;