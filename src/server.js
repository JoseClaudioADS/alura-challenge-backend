const app = require('./app');
const sequelize = require('./infra/database');

const SERVER_PORT = 3000;

sequelize
    .sync({ force: true })
    .then(() => {
        const start = async () => {
            try {
              await app.listen(SERVER_PORT)
            } catch (err) {
              app.log.error(err)
              process.exit(1) 
            }
          }
          start()  
    })
    .catch(() => {
        console.log('Database connection error');
    });
