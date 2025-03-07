require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const HKMatches = require("./matches"); // This should correctly import the function

const app = express();
app.use(cors()); 
app.use(express.json());

const users = [
  { 
      id: 1, 
      username: process.env.ADMIN_USERNAME, 
      password: process.env.ADMIN_PASSWORD
  }
];

const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret";

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Verify authentication
// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(403).json({ message: "No token provided" });

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//       if (err) return res.status(401).json({ message: "Unauthorized" });
//       req.user = decoded;
//       next();
//   });
// };

// Endpoint to fetch matches
app.get('/api/matches', async (req, res) => {
  try {
    const data = await HKMatches(); // Get the match data
    res.json({ matchData: data });  // Send the data as a response
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
