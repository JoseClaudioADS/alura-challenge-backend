const videosRouter = require('./features/videos/videos.router');
const categoriesRouter = require('./features/categories/categories.router');

function registerRoutes(app) {
    app.register(videosRouter, { prefix: '/videos' });
    app.register(categoriesRouter, { prefix: '/categories' });
}

module.exports = {
    registerRoutes,
};
