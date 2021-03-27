const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.get('/concerts/:id',ConcertsController.getId);

router.post('/concerts', ConcertsController.post);

router.put('/concerts/:id', ConcertsController.putId);

router.delete('/concerts/:id', ConcertsController.deleteId);

module.exports = router;