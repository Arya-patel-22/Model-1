const express = require('express');
const app = express();
const path = require('path');

const staticpath = path.join(__dirname,"/public")

app.use(express.static(staticpath));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
