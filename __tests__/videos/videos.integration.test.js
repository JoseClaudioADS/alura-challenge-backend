const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/infra/database');
const Video = require('../../src/infra/database/models/video.model');

describe('Videos Controller', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await Video.truncate({ force: true });
    });

    describe('GetAll', () => {
        it('should get all videos', async () => {
            const videos = [
                {
                    title: 'Video 1',
                    description: 'Description video 1',
                    url: 'https://url-video-1',
                },
                {
                    title: 'Video 2',
                    description: 'Description video 2',
                    url: 'https://url-video-2',
                },
            ];
            await Video.bulkCreate(videos);

            const res = await request(app).get('/videos');
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject(videos);
        });
    });

    describe('Creat', () => {
        it('should create a video', async () => {
            const videoDTO = {
                title: 'Video 1',
                description: 'Description video 1',
                url: 'https://url-video-1',
            };
            const res = await request(app).post('/videos').send(videoDTO);

            expect(res.statusCode).toEqual(201);
            const video = await Video.findOne({
                where: { url: videoDTO.url },
                raw: true,
            });
            expect(res.body).toEqual(video);
            expect(video).toMatchObject(videoDTO);
        });
    });

    describe('Detail', () => {
        it('should detail one video', async () => {
            const video = {
                title: 'Video 1',
                description: 'Description video 1',
                url: 'https://url-video-1',
            };
            const videoCreated = await Video.create(video);
            const res = await request(app).get(`/videos/${videoCreated.id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject(video);
        });
        it('should return 404 NotFound when video by id not exists', async () => {
            const res = await request(app).get('/videos/1');
            expect(res.statusCode).toBe(404);
        });
    });

    describe('Update', () => {
        it('should update one video', async () => {
            const video = {
                title: 'Video 1',
                description: 'Description video 1',
                url: 'https://url-video-1',
            };
            const videoCreated = await Video.create(video);
            const res = await request(app)
                .put(`/videos/${videoCreated.id}`)
                .send({
                    title: 'xpto Video 1 test',
                    description: 'xpto Description video 1 test',
                    url: 'https://url-video-1',
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject({
                title: 'xpto Video 1 test',
                description: 'xpto Description video 1 test',
                url: 'https://url-video-1',
            });
        });
        it('should return 404 NotFound when video by id not exists', async () => {
            const videoDTO = {
                title: 'Video 1',
                description: 'Description video 1',
                url: 'https://url-video-1',
            };
            const res = await request(app).put('/videos/1').send(videoDTO);
            expect(res.statusCode).toBe(404);
        });
    });
});
