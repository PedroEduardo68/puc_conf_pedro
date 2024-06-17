
import uuid from "node-uuid";
import { downloadFile } from "../SCP/scp.js";
import { Devices_Model } from "../../model/Devices.model.js";
import { Files_Model } from "../../model/Files.model.js";
import { HistoryFiles_Model } from "../../model/HistoryFiles.model.js";
import { addDays, createNameDataFile } from "../helper/datainformation.js";









export const ProcessCopyFile = async (FilesInput) => {
    
    try{
        const device =  await Devices_Model.findById(FilesInput.iddevice)
        const dateFile = await createNameDataFile();
        const fileNameDestination = `${dateFile.nameFile}_${uuid()}`;

        /* The line of code is calling the `downloadFile` function and passing in the `device.ipaddress`,
        `device.user`, `device.password`, `FilesInput.sourcefileRemote`, and
        `./filesServers/${dateFile.nameFile}_${uuid()}` as arguments. The `downloadFile` function is
        responsible for downloading a file from a remote server using SCP (Secure Copy Protocol). The
        function returns a response object that contains information about the success or failure of the
        download. */
        const response = await downloadFile(device.ipaddress,device.user,device.password,FilesInput.sourcefileRemote, `./app/FilesServers/${fileNameDestination}`)
        console.log(response)
        if(response.success){

                let fileUpdate = {
                    lastdatatimebackup: dateFile.timeStampToday,
                    backupname: `${fileNameDestination}`
                }

                let fileHistory= {
                    destinatefileRemote: `./app/FilesServers/${fileNameDestination}`,
                    lastdatatimebackup: dateFile.timeStampToday,
                    backupname: `${fileNameDestination}`,
                    idfile: FilesInput._id,
                    successFile: response.success,
                    DateRemoveFile: addDays(7),
                }


                /* `await Files_Model.findByIdAndUpdate(FilesInput._id, fileUpdate, { new: true })` is
                updating the document in the `Files_Model` collection with the specified `_id` value. It
                updates the document with the `fileUpdate` object, and the `{ new: true }` option
                ensures that the updated document is returned. */
                await Files_Model.findByIdAndUpdate(FilesInput._id, fileUpdate, { new: true })

                /* The code is creating a new instance of the `HistoryFiles_Model` model with the `fileHistory` object
                as its data. Then, it is using the `save()` method to save the new instance to the database and
                assigning the result to the `historyResponse` variable. */
                const historyNew = new HistoryFiles_Model(fileHistory)
                const historyResponse = await historyNew.save();
                return {status: true, mensage: {ipaddress : device.ipaddress, file: FilesInput.sourcefileRemote, err : response.mensage, timestamp: dateFile.timeStampToday, deviceid : device._id, FileId: FilesInput._id, HistoryId : historyResponse._id }}

        }else {

            let fileHistory= {
                destinatefileRemote: `./app/FilesServers/${fileNameDestination}`,
                lastdatatimebackup: dateFile.timeStampToday,
                backupname: `${fileNameDestination}`,
                idfile: FilesInput._id,
                successFile: response.success,
                messageErr: response.mensage,
            }


            /* The code is creating a new instance of the `HistoryFiles_Model` model with the `fileHistory` object
            as its data. Then, it is using the `save()` method to save the new instance to the database and
            assigning the result to the `historyResponse` variable. This code is responsible for saving the
            history of the file backup process to the database. */
            const historyNew = new HistoryFiles_Model(fileHistory)
            const historyResponse = await historyNew.save();

            return {status: false, mensage: {ipaddress : device.ipaddress, file: FilesInput.sourcefileRemote, err : response.mensage, timestamp: dateFile.timeStampToday, deviceid : device._id, FileId: FilesInput._id, HistoryId : historyResponse._id }}
        }

    }catch {
        console.log('without devices')
    }
    
}











