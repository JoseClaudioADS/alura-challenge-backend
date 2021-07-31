const yup = require('yup');
const Category = require('../../infra/database/models/category.model');

class CategoriesController {
    async getAll(_, res) {
        const categories = await Category.findAll({ raw: true });
        res.send(categories);
    }

    async detail(req, res) {
        const { params } = req;
        const category = await Category.findByPk(params.id);
        if (category) {
            res.send(category);
        } else {
            res.status(404).send();
        }
    }
}

module.exports = CategoriesController;
