import config from './config.js'
import mongoose from 'mongoose';
import express  from 'express';


const Main = () =>{
    //process starting
    console.log(`<> Loading config envirement ${config.url_mongodb}  <>`)


    //process to connect db    
    try{
        mongoose.connect(config.url_mongodb,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`<> Connected with success! <>`)
    }catch {
        console.log(`<> Falied connected <>`)
    }
    


}


Main()