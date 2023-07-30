import { Files_Model } from "../../model/Files.model.js";
import { ProcessCopyFile } from "./ProcessCopyFile.js";


export const TypeProcessGETAllFiles = async () =>{
    let successCount = 0;
    let errorCount = 0;
    let errorFiles = [{}];

    /* `const findAll =  await Files_Model.find({})` is querying the database to find all documents in
    the "Files" collection. It uses the `find()` method of the `Files_Model` to retrieve all
    documents that match the specified query `{}` (an empty object). The result is stored in the
    `findAll` variable. */
    const findAll =  await Files_Model.find({}) 
    for (let i = 0; i < findAll.length; i++){
        /* The code is calling the `ProcessCopyFile` function with the `findAll[i]` parameter, which is an
        element from the `findAll` array. */
        const response = await ProcessCopyFile(findAll[i]);

        if(response.status === true){
            successCount +=1
        }else{
            errorCount +=1
            errorFiles.push(response.mensage)
        }
    }
    return {success: successCount, faleid: errorCount, information : errorFiles}
}






export const TypeProcessGETByIDFiles = async (fileId) =>{
    let successCount = 0;
    let errorCount = 0;
    let errorFiles = [{}];

    /* `const findAll =  await Files_Model.find({})` is querying the database to find all documents in
    the "Files" collection. It uses the `find()` method of the `Files_Model` to retrieve all
    documents that match the specified query `{}` (an empty object). The result is stored in the
    `findAll` variable. */
    const findByID =  await Files_Model.findById(fileId) 

    /* The code is calling the `ProcessCopyFile` function with the `findAll[i]` parameter, which is an
    element from the `findAll` array. */
    const response = await ProcessCopyFile(findByID);
    if(response.status){
        successCount +=1
    }else{
        errorCount +=1
        errorFiles.push(response.mensage)
    }

    return {success: successCount, faleid: errorCount, information : errorFiles}
}