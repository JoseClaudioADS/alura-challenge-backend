const yup = require('yup');

const createVideoSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    url: yup.string().url().required(),
});

const updateVideoSchema = createVideoSchema;

module.exports = {
    createVideoSchema,
    updateVideoSchema,
};
