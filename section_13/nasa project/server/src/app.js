const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const version1Router = require('./version/version1');

app.use(cors({
    origin : 'http://localhost:4000'
}))
app.use(express.json());
app.use(morgan('combined'));
app.use('/v1' , version1Router)


module.exports = app;