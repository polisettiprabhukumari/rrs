const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Hardcoded Users
const users = [
  { username: 'passenger1', password: 'pass123', role: 'passenger' },
  { username: 'clerk1', password: 'clerk123', role: 'clerk' },
];

// In-Memory Storage for Bookings
let bookings = [];

// User Login
app.post('/api/users/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ message: `Login successful as ${user.role}`, role: user.role });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Book Ticket
app.post('/api/bookings/book', (req, res) => {
  const booking = { id: Date.now(), ...req.body, status: 'confirmed' };
  bookings.push(booking);
  res.json({ message: 'Ticket booked successfully', booking });
});

// Cancel Ticket
app.post('/api/bookings/cancel/:id', (req, res) => {
  const { id } = req.params;
  const index = bookings.findIndex((b) => b.id == id);

  if (index !== -1) {
    bookings[index].status = 'cancelled';
    res.json({ message: 'Ticket cancelled successfully', booking: bookings[index] });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

// View Bookings
app.get('/api/bookings/view', (req, res) => {
  res.json(bookings);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
