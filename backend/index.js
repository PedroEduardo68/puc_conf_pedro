import config from './config.js'
import mongoose from 'mongoose';
import express  from 'express';
import DevicesRouter from './app/routes/Devices.router.js'


const Main = async () =>{
    //express
    const app = express();



    //process starting
    console.log(`<> Loading config envirement ${config.url_mongodb}  <>`)


    //process to connect db    
    mongoose.connect(`${config.url_mongodb}`,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(`<> Falied connected <>`)
    


    // const device = new Devices_Model({
    //     ipaddress : "192.168.1.10",
    //     user: "teste",
    //     password:"teste"
    // })

    // await device.save();









    //Devices routers 
    app.use('/api/devices/', DevicesRouter)



    // Define a route default 
    app.get('/', (req, res) => {
        res.send('<h1> Hello, API is working! <h1>');
    });



    // Start the server
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}


Main()