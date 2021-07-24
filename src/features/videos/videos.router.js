const VideosController = require('./videos.controller');

const videosRouter = function (fastify, opts, done) {

    const videosController = new VideosController();

    fastify.get('', videosController.getAll);
    fastify.get('/:id', videosController.detail);
    fastify.post('', videosController.create);
    fastify.put('/:id', videosController.update);

    done()
};

module.exports = videosRouter;
