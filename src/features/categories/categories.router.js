const CategoriesController = require('./categories.controller');

const categoriesRouter = function (fastify, opts, done) {
    const categoriesController = new CategoriesController();

    fastify.get('', categoriesController.getAll);
    fastify.get('/:id', categoriesController.detail);
    // fastify.post('', videosController.create);
    // fastify.put('/:id', videosController.update);

    done();
};

module.exports = categoriesRouter;
