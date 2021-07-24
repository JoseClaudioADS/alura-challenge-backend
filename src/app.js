const app = require('fastify')({ logger: false })
const { registerRoutes } = require('./router');

registerRoutes(app);

module.exports = app;
