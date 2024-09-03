const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const pdsRoutes = require('../routes/PDS.routes'); // Update path if necessary

const app = express();

app.use(bodyParser.json()); 
app.use(cors()); 

const dbURI = 'mongodb://localhost:27017/ManTalavahoDB'; 
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to ManTalavahoDB'))
  .catch((error) => console.error('Error connecting to the database:', error));

app.use('/api/pds', pdsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the ManTalavaho ServerSide');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
