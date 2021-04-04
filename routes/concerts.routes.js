const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getConcertAll);

router.get('/concerts/:id', ConcertsController.getConcertById);

router.get('/concerts/:id/tickets', ConcertsController.getTicketsOfConcerts);

router.get('/concerts/performer/:performer', ConcertsController.getConcertByPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getConcertByGenre);

router.get('/concerts/price/day/:day', ConcertsController.getConcertByDay);

router.get('/concerts/price/:price_min/:price_max', ConcertsController.getConcertByPrice);

router.post('/concerts', ConcertsController.post);

router.put('/concerts/:id', ConcertsController.putId);

router.delete('/concerts/:id', ConcertsController.deleteId);

module.exports = router;