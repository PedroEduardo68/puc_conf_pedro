import mongoose from "mongoose"
/* The code is defining a schema for a MongoDB collection called "Files_Model". The schema specifies
the structure and data types of the documents that will be stored in the collection. */

const HistoryFilesSchema = new mongoose.Schema({
    nameFile:{
        type: String,
        unique:  false,
    },
    destinatefileRemote:{
        type: String,
        required: true,
        unique:  true,
    },
    lastdatatimebackup:{
        type: Date,
        unique:  false,
    },
    backupname:{
        type: String,
        unique: false,
    },
    successFile:{
        type: String,
        unique: false,
    },
    messageErr:{
        type: String,
        unique: false,
    },
    DateRemoveFile: {
        type: Date,
        unique: false,
    },
    idfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files_Model',
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
})


export const HistoryFiles_Model = mongoose.model('HistoryFiles_Model', HistoryFilesSchema)