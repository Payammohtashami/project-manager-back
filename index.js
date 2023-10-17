const Application = require('./app/server');
const PORT = 4000;
const DB_URL = 'mongodb://127.0.0.1:27017/express-practice';
new Application(PORT, DB_URL);