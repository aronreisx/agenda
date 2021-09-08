const express = require('express');
const route = express.Router();

const root = require('./src/controllers/rootController');
const login = require('./src/controllers/loginController');
const contact = require('./src/controllers/contactController');

const {loginRequired} = require('./src/middlewares/loginRequired');

//* Route Home
route.get('/', root.index);

//* Routes Login
route.get('/login/index', login.index);
route.post('/login/register', login.register);
route.post('/login/login', login.login);
route.get('/login/logout', login.logout);

//* Routes Contact
route.get('/contact/index', loginRequired, contact.index);
route.post('/contact/register', loginRequired, contact.register);
route.get('/contact/index/:id', loginRequired, contact.editIndex);
route.post('/contact/edit/:id', loginRequired, contact.edit)
route.get('/contact/delete/:id', loginRequired, contact.delete)

module.exports = route;
