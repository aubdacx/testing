// serverIndex.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const pdsRoutes = require('../routes/PDS.routes'); 
const jobPostingRoutes = require('../routes/jobPosting.routes'); 

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/ManTalavahoDB';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to ManTalavahoDB'))
  .catch((error) => console.error('Error connecting to the database:', error));

// Routes
app.use('/api/pds', pdsRoutes);
app.use('/api/job-postings', jobPostingRoutes); 

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the ManTalavaho ServerSide');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
