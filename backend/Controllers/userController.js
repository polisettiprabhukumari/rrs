const User = require('../Models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ message: `Login successful as ${user.role}`, role: user.role });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

exports.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'User registered successfully', user });
};
