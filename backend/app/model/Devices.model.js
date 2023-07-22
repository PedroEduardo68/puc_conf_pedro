import mongoose from "mongoose"

const DevicesSchema = new mongoose.Schema({
    comment :{
        type: String,
    },
    ipaddress:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    user:{
        type: String,
        required: true,
        unique: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
})


export const Devices_Model = mongoose.model('Devices_Model', DevicesSchema)