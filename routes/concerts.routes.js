const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/:id', ConcertsController.getId);

router.get('/concerts/performer/:performer', ConcertsController.getPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getGenre);

router.get('/concerts/price/day/:day', ConcertsController.getDay);

router.get('/concerts/price/:price_min/:price_max', ConcertsController.getPrice);

router.post('/concerts', ConcertsController.post);

router.put('/concerts/:id', ConcertsController.putId);

router.delete('/concerts/:id', ConcertsController.deleteId);

module.exports = router;