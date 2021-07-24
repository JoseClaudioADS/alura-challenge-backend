const app = require('./app');
const sequelize = require('./infra/database');

const SERVER_PORT = 3000;

sequelize
    .sync({ force: true })
    .then(() => {
        app.listen(SERVER_PORT, () => {
            console.log(`Server started at por ${SERVER_PORT}`);
        });
    })
    .catch(() => {
        console.log('Database connection error');
    });
