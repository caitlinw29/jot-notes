const express = require('express');

// Import our modular routers for api
const apiRouter = require('./notes');

const app = express();

app.use('/notes', apiRouter);

module.exports = app;