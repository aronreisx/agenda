require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { SERVER_PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, SESSION_SECRET } = process.env;

const dbConnection = mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}`, {
  dbName:DB_NAME,
  user:DB_USER,
  pass:DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then((data) => {
  console.log(data.connection.getClient());
  app.emit('db_connected');
  console.log('Database connected successfully.');
  return data.connection.getClient();
}).catch((err) => console.log(err));

const routes = require('./routes');
const { resolve } = require('path');
const hbs = require('hbs');
const helmet = require('helmet');
const flash = require('connect-flash');
const csrf = require('csurf');
const { checkCsrfError, csrfMiddleware } = require('./src/middlewares/csrf');
const { flashMessages } = require('./src/middlewares/flashMessages');
const { sessionUserToLocals } = require('./src/middlewares/sessionUserToLocals');

app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionOptions = session({
  store: MongoStore.create({
    clientPromise: dbConnection,
    dbName:DB_NAME,
  }),
  secret: SESSION_SECRET,
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

hbs.registerHelper('arrayContains', function (value) {
  return value.length > 0;
});

app.set('views', resolve(__dirname, 'src', 'views'));
app.set('view engine', '.hbs');

app.use(csrf());
app.use(flash());
app.use(flashMessages);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(sessionUserToLocals);
app.use(routes);

app.on('db_connected', () => {
  app.listen(SERVER_PORT, () => {
      console.log(`App is running at http://localhost:${SERVER_PORT}`);
  });
});
