const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { AllRoutes } = require('./routers/router');

module.exports = class Application {
    #app = express();
    constructor(PORT, DB_URL){
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    };
    configApplication(){
        const path = require('path');
        this.#app.use(express.json());
        this.#app.use(morgan('dev'));
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
    };
    createServer(PORT){
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Run on port http://localhost:${PORT}`);
        });
    };
    errorHandler(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: 'صفحه با آدرس مورد نظر یافت نشد',
            });
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.status ?? 500;
            const message = error?.message ?? 'internal server error';
            return res.status(status).json({
                status,
                message,
            })
        });
    };
    configDatabase(DB_URL){
        mongoose.connect(DB_URL).then(() => {
            console.log('Server Connected To mongoDB 😍');
        }).catch((error) => {
            console.log({error});
        });
    };
    createRoutes(){
        this.#app.get('/', (req, res, next) => {
            res.send({
                message: 'welcome to express application!',
            })
        });
        this.#app.use(AllRoutes);
    };
}