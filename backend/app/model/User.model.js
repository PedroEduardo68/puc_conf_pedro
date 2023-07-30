import mongoose from "mongoose"

/* The code is defining a Mongoose schema for a user object. The schema specifies the structure and
properties of a user document in a MongoDB collection. */
const UserSchema = new mongoose.Schema({
    username:{
        type: String, 
        unique: true, 
        required: true
    },
    passwordHash: { 
        type: String, 
        required: true 
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
})


export const UserSchema_Model = mongoose.model('UserSchema_Model', UserSchema)