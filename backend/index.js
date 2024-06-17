import config from './config.js'
import mongoose from 'mongoose';
import express  from 'express';
import DevicesRouter from './app/routes/Devices.router.js'
import FilesRouter from './app/routes/Files.router.js'
import cors from 'cors';
import ActionsRouter from './app/routes/Actions.router.js';
import HistoryRouter from './app/routes/History.router.js';
import UserRouter from './app/routes/User.router.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


import bodyParser from 'body-parser';
import { verifyToken } from './app/controller/User.controll.js';
import { TypeProcessGETAllFiles } from './app/services/Process/TypeProcess.js';
import { setcleanAllHistoryFilesFalied } from './app/controller/History.controll.js';


const Main = async () =>{
    //express
    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use(bodyParser.json());




    // Get the current directory path using 'import.meta.url'
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Set the static files directory
    const staticFilesDir = join(__dirname, 'FilesServers');
    app.use(express.static(staticFilesDir));




    //process starting
    console.log(`<> Loading config envirement ${config.url_mongodb}  <>`)



   /* The code `mongoose.connect(`${config.url_mongodb}`,{ useNewUrlParser: true, useUnifiedTopology:
   true }).catch(`<> Falied connected <>`)` is establishing a connection to a MongoDB database using
   the Mongoose library. */
    mongoose.connect(`${config.url_mongodb}`,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(`<> Falied connected <>`)


    /* The code `app.use('/api/devices/', DevicesRouter)` is setting up a middleware in the Express
    application. It specifies that any requests with the path '/api/devices/' should be handled by the
    `DevicesRouter` router. This means that any routes defined in the `DevicesRouter` will be accessible
    under the '/api/devices/' path. */
    //app.use('/api/devices/', verifyToken, DevicesRouter)
    app.use('/api/devices/', DevicesRouter)


    // /* The code `app.use('/api/Files/', FilesRouter)` is setting up a middleware in the Express
    // application. It specifies that any requests with the path '/api/Files/' should be handled by the
    // `FilesRouter` router. This means that any routes defined in the `FilesRouter` will be accessible
    // under the '/api/Files/' path. */
    app.use('/api/Files/', FilesRouter)

    /* The code `app.use('/api/actions/', ActionsRouter)` is setting up a middleware in the Express
    application. It specifies that any requests with the path '/api/actions/' should be handled by the
    `ActionsRouter` router. This means that any routes defined in the `ActionsRouter` will be accessible
    under the '/api/actions/' path. */
    app.use('/api/actions/',  ActionsRouter)


    /* `app.use('/api/history/', HistoryRouter)` is setting up a middleware in the Express application.
    It specifies that any requests with the path '/api/history/' should be handled by the
    `HistoryRouter` router. This means that any routes defined in the `HistoryRouter` will be
    accessible under the '/api/history/' path. */
    app.use('/api/history/', HistoryRouter)


    app.use('/api/user/', UserRouter)

    try{
        TypeProcessGETAllFiles();
    }catch {
        console.log('without devices')
    }

    // Define a route default 
    app.get('/', (req, res) => {
        res.send('<h1> Hello, API is working! <h1>');
    });


    // Start the server
    app.listen(config.portweb, () => {
        console.log(`Server is running on port ${config.portweb}`);
    });
}


Main()