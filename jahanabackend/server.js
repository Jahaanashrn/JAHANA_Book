const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Express Server is running successfully!');
});

app.post('/test', (req, res) => {
  console.log(req.body);
  res.send({ message: 'Received!', data: req.body });
});


app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
