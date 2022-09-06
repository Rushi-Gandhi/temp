const express = require('express');
const version1Router = express.Router();

const planetRouter = require('../routes/planets/planets.routes');
const launchesrouter = require('../routes/launches/launches.router');

version1Router.use('/planets',planetRouter);
version1Router.use('/launches',launchesrouter);

module.exports = version1Router ;