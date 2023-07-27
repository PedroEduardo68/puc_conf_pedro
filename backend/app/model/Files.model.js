// import mongoose from "mongoose"
// import { HistoryFiles_Model } from "./HistoryFiles.model"


// /* The code is defining a schema for a MongoDB collection called "Files_Model". The schema specifies
// the structure and data types of the documents that will be stored in the collection. */

// const FilesSchema = new mongoose.Schema({
//     comment :{
//         type: String,
//     },
//     nameFile:{
//         type: String,
//     },
//     sourcefileRemote:{
//         type: String,
//         required: true,
//     },
//     lastdatatimebackup:{
//         type: Date,
//     },
//     backupname:{
//         type: String,
//     },
//     createdDate: {
//         type: Date,
//         required: true,
//         default: Date.now,
//     },
//     idfile:[{
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'HistoryFiles_Model',
//     }],
// })


// export const Files_Model = mongoose.model('Files_Model', FilesSchema)