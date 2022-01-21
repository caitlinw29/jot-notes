const express = require('express');

// Import our modular routers for html and api
const htmlRouter = require('./html/html-routes');
const apiRouter = require('./api/notes');

const app = express();

app.use('/html', htmlRouter);
app.use('/api', apiRouter)

module.exports = app;