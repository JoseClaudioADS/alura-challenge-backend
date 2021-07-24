const express = require('express');
const { registerRoutes } = require('./router');

const app = express();
app.use(express.json());

registerRoutes(app);

module.exports = app;
