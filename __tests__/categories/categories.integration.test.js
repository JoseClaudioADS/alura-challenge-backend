const request = require('supertest');
const app = require('../../src/app');
const sequelize = require('../../src/infra/database');
const Category = require('../../src/infra/database/models/category.model');

describe('Categories Controller', () => {
    let server;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        await app.ready();
        server = app.server;
    });

    beforeEach(async () => {
        await Category.truncate({ force: true });
    });

    afterAll(async () => {
        app.close();
    });

    describe('GetAll', () => {
        it('should get all categories', async () => {
            const categories = [
                {
                    title: 'Category 1',
                    color: 'blue',
                },
                {
                    title: 'Category 2',
                    color: 'red',
                },
            ];
            await Category.bulkCreate(categories);

            const res = await request(server).get('/categories');
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject(categories);
        });
    });

    describe('Detail', () => {
        it('should detail one category', async () => {
            const category = {
                title: 'Category 1',
                color: 'yellow',
            };
            const categoryCreated = await Category.create(category);
            const res = await request(server).get(
                `/categories/${categoryCreated.id}`
            );
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject(category);
        });
        it('should return 404 NotFound when category by id not exists', async () => {
            const res = await request(server).get('/categories/1');
            expect(res.statusCode).toBe(404);
        });
    });
});
