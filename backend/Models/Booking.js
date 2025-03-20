const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  passenger_name: { type: String, required: true },
  train_no: { type: String, required: true },
  seat_count: { type: Number, required: true },
  status: { type: String, default: 'confirmed' },
});

module.exports = mongoose.model('Booking', bookingSchema);
