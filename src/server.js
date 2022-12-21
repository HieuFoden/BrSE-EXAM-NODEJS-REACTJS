import express from 'express';
import configViewEngine from './config/viewEngine';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
require('dotenv').config();
import bodyParser from 'body-parser';
// import connection from './config/connectDB';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);
//config ViewEngine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// config cookie-parser
app.use(cookieParser());
//connect database
// connection();

//Init api route
initApiRoutes(app);

let cors = require('cors')

app.use(cors())

app.listen(PORT, () => {
    console.log('>>> JWT Back-end is running the port = ' + PORT);
});