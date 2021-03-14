const express = require('express');
const cors = require('cors');
var uniqid = require('uniqid');
const db = require('./db');
const routerTestimonial = require('./routes/testimonials.routes')

const app = express();
const confirmation = { message: 'OK'};

app.use(express.urlencoded( {extended: false} ));
app.use(express.json());
app.use(cors());

app.use('/api/', routerTestimonial);
// app.use('/api/testimonials/random', routerTestimonial);
// app.use('/api/testimonials/:id', routerTestimonial);

// app.get('/testimonials', (req, res) => {
//   res.json(db.testimonials);
// });

// app.get('/testimonials/random', (req, res) => {
//   const getRandomNumber = (max) => {
//     return Math.floor(Math.random() * (max + 1));
//   };
//   res.json(db.testimonials[getRandomNumber(db.testimonials.length)]);
// });

// app.get('/testimonials/:id', (req, res) => {
//   res.json(db.testimonials.find(item => item.id == req.params.id));
// });

// app.post('/testimonials', (req, res) => {
//   db.testimonials.push({
//     id: uniqid(),
//     author: req.body.author,
//     text: req.body.text,
//   });
//   // res.json(req.body);
//   res.json(confirmation);
// });

// app.put('/testimonials/:id', (req, res) => {
//   const updatedItem = ({
//     id: req.params.id,
//     author: req.body.author,
//     text: req.body.text,
//   });
//   const itemToUpdate = db.testimonials.find(item => item.id == req.params.id);
//   const index = db.testimonials.indexOf(itemToUpdate);
//   db.testimonials[index] = updatedItem;
//   res.json(confirmation);
// });

// app.delete('/testimonials/:id', (req, res) => {
//   const deletedItem = db.testimonials.find(item => item.id == req.params.id);
//   const index = db.testimonials.indexOf(deletedItem);
//   db.testimonials.splice(index, 1);
//   res.json(confirmation);
// });

app.get('/concerts', (req, res) =>{
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) =>{
  res.json(db.concerts.find(item => item.id == req.params.id));
});

app.post('/concerts', (req, res) => {
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

app.put('/concerts/:id', (req, res) => {
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

app.delete('/concerts/:id', (req, res) => {
  const deletedItem = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(deletedItem);
  db.concerts.splice(index, 1);
  res.json(confirmation);
});

app.get('/seats', (req, res) =>{
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) =>{
  res.json(db.seats.find(item => item.id == req.params.id));
});

app.post('/seats', (req, res) => {
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

app.put('/seats/:id', (req, res) => {
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

app.delete('/seats/:id', (req, res) => {
  const deletedItem = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(deletedItem);
  db.seats.splice(index, 1);
  res.json(confirmation);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});