const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 5000; 


mongoose.connect('<your_mongodb_connection_string>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const DataSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  sample: { type: Number, required: true },
});

const Data = mongoose.model('Data', DataSchema);


app.use(cors());


app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});


app.get('/api/data/filter', async (req, res) => {
  const { startTime, frequency } = req.query;
  

  try {
    const filteredData = await Data.find();
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error filtering data' });
  }
});

app.get('/api/weather', async (req, res) => {
  const { location } = req.query; 
  const apiKey = '<your_openweathermap_api_key>'; 

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=<span class="math-inline">\{location\}&appid\=</span>{apiKey}`);
    res.json(response.data); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));