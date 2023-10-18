const Application = require('./app/server');
const DB_URL = 'MONGO_DB_URL';
require('dotenv').config();
new Application(process.env.PORT, process.env.MONGO_DB_URL);