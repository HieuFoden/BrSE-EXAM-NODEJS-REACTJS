import express from 'express';
import apiController from '../controller/apiController';
import productController from '../controller/productController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';
import roleController from '../controller/roleController';

const router = express.Router();

const initApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission,);

    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    router.post('/logout', apiController.handleLogout);
    router.get('/account', userController.getUserAcount); // tra ve cac thong tin can thiet khi dang nhap

    router.get('/product/read', productController.showProduct);
    router.get('/product/read/:id', productController.showDetailProduct);

    router.get('/user/read', userController.readUser);
    router.post('/user/create', userController.createUser);
    router.put('/user/update', userController.updateUser);
    router.delete('/user/delete', userController.deleteUser);

    router.get('/group/read', groupController.readGroup);

    router.get('/role/read', roleController.readRole);
    router.post('/role/create', roleController.createRole);
    router.put('/role/update', roleController.updateRole);
    router.delete('/role/delete', roleController.deleteRole);

    //giao dien khoi dau
    return app.use('/api/v1/', router);
};
export default initApiRoutes;