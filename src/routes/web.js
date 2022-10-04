import express from 'express';
import homeController from '../controller/homeController';

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.handleHomepage);
    router.get('/user', homeController.handleUserPage);
    router.post('/users/create-user', homeController.handleCreateNewUser);
    router.post('/delete-user/:id', homeController.handleDeleteUser);

    router.get('/about', (req, res) => {
        return res.send(`I'm Foden`);
    });

    //giao dien khoi dau
    return app.use('/', router);
};
export default initWebRoute;