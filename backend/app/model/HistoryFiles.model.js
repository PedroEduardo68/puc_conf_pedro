import mongoose from "mongoose"
/* The code is defining a schema for a MongoDB collection called "Files_Model". The schema specifies
the structure and data types of the documents that will be stored in the collection. */

const HistoryFilesSchema = new mongoose.Schema({
    nameFile:{
        type: String,
    },
    destinatefileRemote:{
        type: String,
        required: true,
    },
    lastdatatimebackup:{
        type: Date,
    },
    backupname:{
        type: String,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
})


export const HistoryFiles_Model = mongoose.model('HistoryFiles_Model', HistoryFilesSchema)