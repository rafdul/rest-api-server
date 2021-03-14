const express = require('express');
const cors = require('cors');
const routerTestimonial = require('./routes/testimonials.routes');
const routerConcerts = require('./routes/concerts.routes');
const routerSeats = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded( {extended: false} ));
app.use(express.json());
app.use(cors());

app.use('/api/', routerTestimonial);
app.use('/api/', routerConcerts);
app.use('/api/', routerSeats);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});