const express = require('express');
const { bookTicket, cancelTicket, viewBookings } = require('../Controllers/bookingController');
const router = express.Router();

router.post('/book', bookTicket);
router.post('/cancel/:id', cancelTicket);
router.get('/view', viewBookings);

module.exports = router;
