const express = require('express');
const router = express.Router();
var uniqid = require('uniqid');
const db = require('../db.js');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };
  res.json(db.testimonials[getRandomNumber(db.testimonials.length)]);
});
  
router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  db.testimonials.push({
    id: uniqid(),
    author: req.body.author,
    text: req.body.text,
  });
  // res.json(req.body);
  res.json(confirmation);
});

router.route('/testimonials/:id').put((req, res) => {
  const updatedItem = ({
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  });
  const itemToUpdate = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(itemToUpdate);
  db.testimonials[index] = updatedItem;
  res.json(confirmation);
});

router.route('/testimonials/:id').delete((req, res) => {
  const deletedItem = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(deletedItem);
  db.testimonials.splice(index, 1);
  res.json(confirmation);
});


module.exports = router;