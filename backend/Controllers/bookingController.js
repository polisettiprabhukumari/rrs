const Booking = require('../Models/Booking');

exports.bookTicket = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: 'Ticket booked successfully', booking });
};

exports.cancelTicket = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findByIdAndUpdate(
    id,
    { status: 'cancelled' },
    { new: true }
  );
  if (booking) {
    res.json({ message: 'Ticket cancelled successfully', booking });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
};

exports.viewBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};
