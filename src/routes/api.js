import express from 'express';
import apiController from '../controller/apiController';
import productController from '../controller/productController';
import userController from '../controller/userController';

const router = express.Router();

const initApiRoutes = (app) => {

    //test api
    router.get('/test-api', apiController.testApi);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);

    router.get('/product/read', productController.showProduct);
    router.get('/product/read/:id', productController.showDetailProduct);

    router.get('/user/read', userController.readUser);
    router.post('/user/create', userController.createUser);
    router.put('user/update', userController.updateUser);
    router.delete('user/delete', userController.deleteUser);

    //giao dien khoi dau
    return app.use('/api/v1/', router);
};
export default initApiRoutes;