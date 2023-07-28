import { Devices_Model } from "../model/Devices.model.js"
import { Files_Model } from "../model/Files.model.js"
import { HistoryFiles_Model } from "../model/HistoryFiles.model.js";
import { downloadFile } from "../services/SCP/scp.js"
import { addDays, createNameDataFile } from "../services/helper/datainformation.js"
import uuid from "node-uuid";

export const backupnowalldevices = async (req,res) => {
    let successCount = 0;
    let errorCount = 0;
    let errorFiles = [{}];

    const findAll =  await Files_Model.find({})
        
    for (let i = 0; i < findAll.length; i++){
        const device =  await Devices_Model.findById(findAll[i].iddevice)
        const dateFile = await createNameDataFile();
        const response = await downloadFile(device.ipaddress,device.user,device.password,findAll[i].sourcefileRemote, `./filesServers/${dateFile.nameFile}_${uuid()}`)

        if(response.sucess){
            successCount += 1;

                let fileUpdate = {
                    lastdatatimebackup: dateFile.timeStampToday,
                    backupname: `${dateFile.nameFile}_${uuid()}`
                }

                let fileHistory= {
                    destinatefileRemote: `./filesServers/${dateFile.nameFile}_${uuid()}`,
                    lastdatatimebackup: dateFile.timeStampToday,
                    backupname: `${dateFile.nameFile}_${uuid()}`,
                    idfile: findAll[i]._id,
                    successFile: response.success,
                    DateRemoveFile: addDays(7),
                }


                await Files_Model.findByIdAndUpdate(findAll[i]._id, fileUpdate, { new: true })

                const historyNew = new HistoryFiles_Model(fileHistory)
                const newData = await historyNew.save();


        }else {
            errorCount += 1;
            errorFiles.push({ipaddress : device.ipaddress, file: findAll[i].sourcefileRemote, err : response.mensage, timestamp: dateFile.timeStampToday, deviceid : device._id, FileId: findAll[i]._id })
            
            let fileHistory= {
                destinatefileRemote: `./filesServers/${dateFile.nameFile}_${uuid()}`,
                lastdatatimebackup: dateFile.timeStampToday,
                backupname: `${dateFile.nameFile}_${uuid()}`,
                idfile: findAll[i]._id,
                successFile: response.success,
                messageErr: response.mensage,
            }


            const historyNew = new HistoryFiles_Model(fileHistory)
            await historyNew.save();

        }
    }

    res.status(200).json({success: successCount, faleid: errorCount, information : errorFiles})
}











