const videosRouter = require('./features/videos/videos.router');

function registerRoutes(app) {
    app.register(videosRouter, { prefix: '/videos' });
}

module.exports = {
    registerRoutes,
};
