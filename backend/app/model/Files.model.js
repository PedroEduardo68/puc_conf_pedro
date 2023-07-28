import mongoose from "mongoose"


/* The code is defining a schema for a MongoDB collection called "Files_Model". The schema specifies
the structure and data types of the documents that will be stored in the collection. */

const FilesSchema = new mongoose.Schema({
    comment :{
        type: String,
        unique:  false
    },
    iddevice :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Devices_Model',
    },
    nameFile:{
        type: String,
        unique:  false
    },
    sourcefileRemote:{
        type: String,
        required: true,
        unique:  false
    },
    lastdatatimebackup:{
        type: Date,
        unique:  false
    },
    backupname:{
        type: String,
        unique:  false
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },

})


export const Files_Model = mongoose.model('Files_Model', FilesSchema)