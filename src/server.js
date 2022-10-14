import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
require('dotenv').config();
import bodyParser from 'body-parser';
import connection from './config/connectDB';

const app = express();

//config ViewEngine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connect database
connection();
//Init Web route
initWebRoute(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('>>> JWT Back-end is running the port = ' + PORT);
});