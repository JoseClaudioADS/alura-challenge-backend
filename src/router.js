const videosRouter = require('./features/videos/videos.router');

function registerRoutes(app) {
    app.use('/videos', videosRouter);
}

module.exports = {
    registerRoutes,
};
