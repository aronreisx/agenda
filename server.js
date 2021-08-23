require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.emit('connected'),
    console.log('Database connected successfully');
}).catch((err) => {
    console.log(err)
});

const routes = require('./routes');
const { resolve } = require('path');
const hbs = require('hbs');
const helmet = require('helmet');
const csrf = require('csurf');
const { checkCsrfError, csrfToken } = require('./src/middlewares/csrf');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionOptions = session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(helmet());
app.use(csrf());
app.use(checkCsrfError());
app.use(csrfToken());
app.use(routes);

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
