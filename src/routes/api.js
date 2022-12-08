import express from 'express';
import apiController from '../controller/apiController';
import productController from '../controller/productController';

const router = express.Router();

const initApiRoutes = (app) => {

    //test api
    router.get('/test-api', apiController.testApi);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    router.get('/product/read', productController.showProduct);
    router.get('/product/read/:id', productController.showDetailProduct);

    //giao dien khoi dau
    return app.use('/api/v1/', router);
};
export default initApiRoutes;