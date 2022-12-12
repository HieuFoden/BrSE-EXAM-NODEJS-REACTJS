import express from 'express';
import configViewEngine from './config/viewEngine';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
require('dotenv').config();
import bodyParser from 'body-parser';
import connection from './config/connectDB';

const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);
//config ViewEngine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connect database
connection();
//Init api route
initApiRoutes(app);

app.listen(PORT, () => {
    console.log('>>> JWT Back-end is running the port = ' + PORT);
});