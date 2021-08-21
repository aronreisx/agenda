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
const path = require('path');
const hbs = require('hbs');

app.use(routes);

app.engine('.hbs', hbs.__express);
hbs.registerPartials(path.resolve(__dirname, 'src', 'views', 'partials'))

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', '.hbs');

app.on('connected', () => {
  const port = 3333;

  app.listen(port, () => {
      console.log(`App is running at http://localhost:${port}`);
  });
});
