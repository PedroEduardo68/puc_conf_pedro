import mongoose from "mongoose"

const FilesSchema = new mongoose.Schema({
    comment :{
        type: String,
    },
    nameFile:{
        type: String,
        required: true,
        unique: true,
    },
    sourcefileRemote:{
        type: String,
        required: true,
        unique: true,
    },
    lastdatatimebackup:{
        type: String,
        required: true,
        unique: true,
    },
    backupname:{
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


export const Files_Model = mongoose.model('Files_Model', FilesSchema)