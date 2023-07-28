
import uuid from "node-uuid";
import { downloadFile } from "../SCP/scp";
import { Devices_Model } from "../../model/Devices.model.js";

export const ProcessCopyFile = async (FilesInput) => {

    const device =  await Devices_Model.findById(FilesInput.iddevice)
    const dateFile = await createNameDataFile();
    const response = await downloadFile(device.ipaddress,device.user,device.password,FilesInput.sourcefileRemote, `./filesServers/${dateFile.nameFile}_${uuid()}`)

    if(response.sucess){

            let fileUpdate = {
                lastdatatimebackup: dateFile.timeStampToday,
                backupname: `${dateFile.nameFile}_${uuid()}`
            }

            let fileHistory= {
                destinatefileRemote: `./filesServers/${dateFile.nameFile}_${uuid()}`,
                lastdatatimebackup: dateFile.timeStampToday,
                backupname: `${dateFile.nameFile}_${uuid()}`,
                idfile: FilesInput._id,
                successFile: response.success,
                DateRemoveFile: addDays(7),
            }


            await Files_Model.findByIdAndUpdate(findAll[i]._id, fileUpdate, { new: true })

            const historyNew = new HistoryFiles_Model(fileHistory)
            const newData = await historyNew.save();


    }else {

        let fileHistory= {
            destinatefileRemote: `./filesServers/${dateFile.nameFile}_${uuid()}`,
            lastdatatimebackup: dateFile.timeStampToday,
            backupname: `${dateFile.nameFile}_${uuid()}`,
            idfile: FilesInput._id,
            successFile: response.success,
            messageErr: response.mensage,
        }


        const historyNew = new HistoryFiles_Model(fileHistory)
        await historyNew.save();

        return {status: false, mensage: {ipaddress : device.ipaddress, file: FilesInput.sourcefileRemote, err : response.mensage, timestamp: dateFile.timeStampToday, deviceid : device._id, FileId: FilesInput._id }}

    }
    

    
}











