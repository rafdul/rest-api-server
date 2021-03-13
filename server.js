const express = require('express');
const cors = require('cors');
var uniqid = require('uniqid');

const app = express();
const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Joseph Conrad', text: 'I think the knowledge came to him at last — only at the very last.'},
];
const confirmation = { message: 'OK'};

app.use(express.urlencoded( {extended: false} ));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };
  res.json(db[getRandomNumber(db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  const index = req.params.id;
  const indexNew = index.slice(1);
  res.json(db[indexNew - 1]);
  // res.json(db.filter(item => item.id === req.params.id));
});

app.post('/testimonials', (req, res) => {
  db.push({
    id: uniqid(),
    author: req.body.author,
    text: req.body.text,
  });
  // res.json(req.body);
  res.json(confirmation);
});

app.put('testimonilals/:id', (req, res) => {
  const updatedItem = ({
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  });
  const itemToUptade = db.find(item => item.id === req.params.id);
  const index = db.indexOf(itemToUptade);
  db[index] = updatedItem;
  res.json(confirmation);
});

app.listen(8080, () => {
  console.log('Server is running on port: 8080');
});