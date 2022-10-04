import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './routes/web';
require('dotenv').config();
import bodyParser from 'body-parser';

const app = express();

//config ViewEngine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Init Web route
initWebRoute(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('>>> JWT Back-end is running the port = ' + PORT);
});