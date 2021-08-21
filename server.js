require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}).then(() => {
    app.emit('connected'),
    console.log('Database connected successfully');
}).catch((err) => {
    console.log(err);
});

const routes = require('./routes');

app.use(routes);

app.on('connected', () => {
  const port = 3333;

  app.listen(port, () => {
      console.log(`App is running at http://localhost:${port}`);
  });
});
