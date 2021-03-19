const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const routerTestimonial = require('./routes/testimonials.routes');
const routerConcerts = require('./routes/concerts.routes');
const routerSeats = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded( {extended: false} ));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/', routerTestimonial);
app.use('/api/', routerConcerts);
app.use('/api/', routerSeats);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, { cors: { origin: '*' } });
// const io = socket(server);

io.on('connection', socket => {
  console.log('New socket - its id: ', socket.id);
});