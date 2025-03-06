const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const HKMatches = require("./matches"); // This should correctly import the function

app.use(cors());  // Allow Cross-Origin Resource Sharing

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
