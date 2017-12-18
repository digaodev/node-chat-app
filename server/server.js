const path = require('path');
const express = require('express');

const publicDir = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicDir));

app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: publicDir
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`API running on localhost:${ port }`));