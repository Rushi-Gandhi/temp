const express = require('express');
const planetRouter = require('./routes/planets/planets.routes');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

app.use(cors({
    origin : 'http://localhost:4000'
}))
app.use(express.json());
app.use(morgan('combined'));
app.use(planetRouter);

module.exports = app;