import config from './config.js'
import mongoose from 'mongoose';
import express  from 'express';
import DevicesRouter from './app/routes/Devices.router.js'
import FilesRouter from './app/routes/Files.router.js'
import {downloadFile}  from './app/services/SCP/scp.js'
import cors from 'cors';


const Main = async () =>{
    //express
    const app = express();
    app.use(cors());



    //process starting
    console.log(`<> Loading config envirement ${config.url_mongodb}  <>`)


 
   /* The code `mongoose.connect(`${config.url_mongodb}`,{ useNewUrlParser: true, useUnifiedTopology:
   true }).catch(`<> Falied connected <>`)` is establishing a connection to a MongoDB database using
   the Mongoose library. */
    mongoose.connect(`${config.url_mongodb}`,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(`<> Falied connected <>`)
    


    // const device = new Devices_Model({
    //     ipaddress : "192.168.1.10",
    //     user: "teste",
    //     password:"teste"
    // })

    // await device.save();


    await downloadFile('192.168.18.199','ubuntu','ubuntu','/home/ubuntu/teste.txt', './teste_dadsada_25.txt')
    


    /* The code `app.use('/api/devices/', DevicesRouter)` is setting up a middleware in the Express
    application. It specifies that any requests with the path '/api/devices/' should be handled by the
    `DevicesRouter` router. This means that any routes defined in the `DevicesRouter` will be accessible
    under the '/api/devices/' path. */
    app.use('/api/devices/', DevicesRouter)


    /* The code `app.use('/api/Files/', FilesRouter)` is setting up a middleware in the Express
    application. It specifies that any requests with the path '/api/Files/' should be handled by the
    `FilesRouter` router. This means that any routes defined in the `FilesRouter` will be accessible
    under the '/api/Files/' path. */
    app.use('/api/Files/', FilesRouter)


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