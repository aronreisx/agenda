require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { SERVER_PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, SECRET } = process.env;

const dbConnection = mongoose.createConnection(`mongodb://${DB_HOST}:${DB_PORT}`, {
  dbName:DB_NAME,
  user:DB_USER,
  pass:DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then((connection) => {
  app.emit('db_connected');
  console.log('Database connected successfully.');
}).catch((err) => console.log(err));

const routes = require('./routes');
const { resolve } = require('path');
const hbs = require('hbs');
const helmet = require('helmet');
const flash = require('connect-flash');
const csrf = require('csurf');
const { checkCsrfError, csrfToken } = require('./src/middlewares/csrf');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionOptions = session({
  store: MongoStore.create({
    mongoUrl: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`,
    dbName: DB_NAME,
  }),
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60*24*7,
    httpOnly: true
  }
});

app.use(sessionOptions)

app.engine('.hbs', hbs.__express);
hbs.registerPartials(resolve(__dirname, 'src', 'views', 'partials'));

app.set('views', resolve(__dirname, 'src', 'views'));
app.set('view engine', '.hbs');

app.on('connected', () => {
  const port = 3333;

  app.listen(port, () => {
      console.log(`App is running at http://localhost:${port}`);
  });
});
