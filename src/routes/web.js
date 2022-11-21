import express from 'express';
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.handleHomepage);
    router.get('/user', homeController.handleUserPage);
    router.post('/users/create-user', homeController.handleCreateNewUser);
    router.post('/delete-user/:id', homeController.handleDeleteUser);
    router.get('/update-user/:id', homeController.getUpdateUserPage);
    router.post('/user/update-user', homeController.handleUpdateUser);

    router.get('/about', (req, res) => {
        return res.render(`I'm Foden`);
    });

    //test api
    router.get('/api/test-api', apiController.testApi);

    //giao dien khoi dau
    return app.use('/', router);
};
export default initWebRoute;