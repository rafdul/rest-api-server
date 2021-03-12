const express = require('express');

const app = express();
const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Joseph Conrad', text: 'I think the knowledge came to him at last — only at the very last.'},
];

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
// app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  const index = req.params.id;
  const indexNew = index.slice(1);
  res.json(db[indexNew - 1]);
});

app.listen(8080, () => {
  console.log('Server is running on port: 8080');
});