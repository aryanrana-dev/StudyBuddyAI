const express = require('express');
const path = require('path');
const { getGeminiResponse } = require('./services/aiClient.js');
const e = require('express');
// Initialize Express application
const app = express();
/**
 * View Engine Configuration
 * 
 * Configure EJS (Embedded JavaScript) as the templating engine
 * and set the views directory path
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(express.json());

// Parse URL-encoded form data (extended: true allows for rich objects and arrays)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// GET route for /homepage
app.get('/homepage', (req, res) => {
  res.render('index');
});

// POST route for /api/ai
app.post('/api/ai', async (req, res) => {
  const { studyTopic, studyLevel } = req.body;
  console.log("Received Study Topic:", studyTopic);
  const response = await getGeminiResponse(studyTopic, studyLevel);
  res.send( response );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
