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

const clients = [
  { 
      id: 1, 
      username: process.env.ADMIN_USERNAME, 
      password: process.env.ADMIN_PASSWORD
  }
];
const users = [
  { 
      id: 1, 
      username: process.env.USER_USERNAME, 
      password: process.env.USER_PASSWORD
  }
];
const USER_QUESTION = process.env.USER_QUESTION;
const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret";
const USER_SECRET_KEY = process.env.USER_SECRET_KEY || "fallback_secret";
const QUESTION_SECRET_KEY = process.env.QUESTION_SECRET_KEY || "fallback_secret";

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = clients.find(user => user.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/api/user-login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
  }

  const userToken = jwt.sign({ id: user.id, username: user.username, role: "user" }, USER_SECRET_KEY, { expiresIn: '1h' });
  res.json({ token: userToken });
});

app.post('/api/user-login-question', (req, res) => {
  const { question } = req.body;
  if (!question) {
      return res.status(400).json({ message: "Question is required." });
  }

  if (question !== USER_QUESTION) {
      return res.status(401).json({ message: "Invalid credentials" });
  }
  const questionToken = jwt.sign({ verified: true, type: "question-answer" }, QUESTION_SECRET_KEY, { expiresIn: '30m' });
  res.json({ token: questionToken });
});

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
