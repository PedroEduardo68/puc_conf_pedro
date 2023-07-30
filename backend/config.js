import dotenv from 'dotenv';

//upload confg env file default
dotenv.config({path: '../.env'});


const config = {
    url_mongodb: process.env.MONGODB_URI,
    colletion_devices: process.env.MONGODB_DEVICES,
    db: process.env.MONGODB_DB,
    portweb: process.env.PORT_WEB_BACKEND,
    jwt_secret: process.env.JWT_SECRET_BACKEND
}




export default config;


