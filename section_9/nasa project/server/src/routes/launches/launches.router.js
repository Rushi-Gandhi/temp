const express = require('express');
const launchesrouter = express.Router();
const {httpGetAllLaunches ,httpAddNewLaunch ,httpAbortLaunch} = require('./launches.controller')

launchesrouter.get('/' , httpGetAllLaunches);
launchesrouter.post('/' , httpAddNewLaunch);
launchesrouter.delete('/:id' , httpAbortLaunch);

module.exports = launchesrouter;