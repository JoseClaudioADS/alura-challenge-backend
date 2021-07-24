const Video = require('../../infra/database/models/video.model');
const { createVideoSchema, updateVideoSchema } = require('./videos.validator');

class VideosController {
    async getAll(req, res) {
        const videos = await Video.findAll({ raw: true });
        console.log(videos);
        res.json(videos);
    }

    async create(req, res) {
        const { body } = req;
        createVideoSchema
            .validate(body, { abortEarly: false })
            .then(async () => {
                const videoCreated = await Video.create(body);
                res.status(201).json(videoCreated);
            })
            .catch((validationErrors) => {
                res.status(400).json(validationErrors.errors);
            });
    }

    async detail(req, res) {
        const { params } = req;
        const video = await Video.findByPk(params.id);
        if (video) {
            res.json(video);
        } else {
            res.sendStatus(404);
        }
    }

    async update(req, res) {
        const { params } = req;
        const video = await Video.findByPk(params.id);
        if (video) {
            const { body } = req;
            updateVideoSchema
                .validate(body, { abortEarly: false })
                .then(async () => {
                    const videoCreated = await video.update(body);
                    res.status(200).json(videoCreated);
                })
                .catch((validationErrors) => {
                    res.status(400).json(validationErrors.errors);
                });
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports = VideosController;
