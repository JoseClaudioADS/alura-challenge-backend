const yup = require('yup');
const Video = require('../../infra/database/models/video.model');
const { createVideoSchema, updateVideoSchema } = require('./videos.validator');

class VideosController {
    async getAll(_, res) {
        const videos = await Video.findAll({ raw: true });
        res.send(videos);
    }

    async create(req, res) {
        const { body } = req;
        try {
            await createVideoSchema.validate(body, { abortEarly: false });
            const videoCreated = await Video.create(body);
            res.status(201).send(videoCreated);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                res.status(400).send(err.errors);
            } else res.send(500);
        }
    }

    async detail(req, res) {
        const { params } = req;
        const video = await Video.findByPk(params.id);
        if (video) {
            res.send(video);
        } else {
            res.status(404).send();
        }
    }

    async update(req, res) {
        const { params } = req;
        const video = await Video.findByPk(params.id);

        if (video) {
            try {
                const { body } = req;
                await updateVideoSchema.validate(body, { abortEarly: false });
                const videoCreated = await video.update(body);
                res.status(200).send(videoCreated);
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    res.status(400).send(err.errors);
                } else res.send(500);
            }
        } else {
            res.status(404).send();
        }
    }
}

module.exports = VideosController;
