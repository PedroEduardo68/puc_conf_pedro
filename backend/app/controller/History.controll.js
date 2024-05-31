import { Devices_Model } from "../model/Devices.model.js"
import { Files_Model } from "../model/Files.model.js"
import { HistoryFiles_Model } from "../model/HistoryFiles.model.js"
import { TypeProcessGETAllFiles } from "../services/Process/TypeProcess.js"
import { backupnowalldevices } from "./Action.controll.js"

export const getAllHistoryFilesSucess = async (req,res) => {
    const arrayReturned = []
    const allHistoryFiles = await HistoryFiles_Model.find({ successFile: true })

    for(let i = 0; i < allHistoryFiles.length; i++) {
        const ByIdFiles = await Files_Model.findById(allHistoryFiles[i].idfile)

        try{
            const ByIdDevices = await Devices_Model.findById(ByIdFiles.iddevice)
            arrayReturned.push({
                ipaddress: ByIdDevices.ipaddress,
                id: allHistoryFiles[i]._id,
                fileId: ByIdFiles._id,
                datetime: allHistoryFiles[i].lastdatatimebackup,
                name: ByIdDevices.nameserver,
                backupname: allHistoryFiles[i].backupname,
            })
            res.status(200).send(arrayReturned)
        }catch(e){
            res.status(404)
        }
    }

}