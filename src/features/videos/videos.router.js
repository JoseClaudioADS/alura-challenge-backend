const { Router } = require('express');
const VideosController = require('./videos.controller');

const videosRouter = Router();
const videosController = new VideosController();

videosRouter.get('', videosController.getAll);
videosRouter.get('/:id', videosController.detail);
videosRouter.post('', videosController.create);
videosRouter.put('/:id', videosController.update);

module.exports = videosRouter;
