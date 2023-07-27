import mongoose from "mongoose"
// import {Files_Model} from './Files.model.js'

/* The code is defining a schema for a collection called "Devices_Model" in a MongoDB database using
the Mongoose library in JavaScript. */
const DevicesSchema = new mongoose.Schema({
    comment :{
        type: String,
    },
    // idfile:[{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: Files_Model,
    // }],
    ipaddress:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
})


export const Devices_Model = mongoose.model('Devices_Model', DevicesSchema)