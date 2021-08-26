const express = require('express');
const route = express.Router();

const root = require('./src/controllers/rootController');
const login = require('./src/controllers/loginController');

route.get('/', root.index);

route.get('/login/index', login.index);
route.post('/login/register', login.register);

module.exports = route;
