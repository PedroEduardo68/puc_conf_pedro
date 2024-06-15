import { Devices_Model } from "../model/Devices.model.js"
import { Files_Model } from "../model/Files.model.js"
import { HistoryFiles_Model } from "../model/HistoryFiles.model.js"
import { TypeProcessGETAllFiles } from "../services/Process/TypeProcess.js"
import { backupnowalldevices } from "./Action.controll.js"

export const getAllHistoryFilesSucess = async (req,res) => {
    const arrayReturned = []
    try{
        const allHistoryFiles = await HistoryFiles_Model.find({ successFile: true })

            for(let i = 0; i < allHistoryFiles.length; i++) {
                const ByIdFiles = await Files_Model.findById(allHistoryFiles[i].idfile)

                    const ByIdDevices = await Devices_Model.findById(ByIdFiles.iddevice)
                    arrayReturned.push({
                        ipaddress: ByIdDevices.ipaddress,
                        id: allHistoryFiles[i]._id,
                        fileId: ByIdFiles._id,
                        datetime: allHistoryFiles[i].lastdatatimebackup,
                        name: ByIdDevices.nameserver,
                        backupname: allHistoryFiles[i].backupname,
                    })
            }
        res.status(200).json(arrayReturned)
    }catch{
        res.status(404).send({ falied: 'dont exist' })
    }
}



export const getAllHistoryFilesFalied  = async (req,res) => {
    const arrayReturned = []
    try{
        const allHistoryFiles = await HistoryFiles_Model.find({ successFile: false })
            console.log(allHistoryFiles)
            for(let i = 0; i < allHistoryFiles.length; i++) {
                const ByIdFiles = await Files_Model.findById(allHistoryFiles[i].idfile)

                    const ByIdDevices = await Devices_Model.findById(ByIdFiles.iddevice)
                    arrayReturned.push({
                        ipaddress: ByIdDevices.ipaddress,
                        id: allHistoryFiles[i]._id,
                        fileId: ByIdFiles._id,
                        datetime: allHistoryFiles[i].lastdatatimebackup,
                        name: ByIdDevices.nameserver,
                        err: allHistoryFiles[i].messageErr,
                    })
            }
        res.status(200).json(arrayReturned)
    }catch{
        res.status(404).send({ falied: 'dont exist' })
    }
}








export const setcleanAllHistoryFilesFalied  = async (req,res) => {
    try{
        const deleteDevice = await HistoryFiles_Model.deleteMany({successFile: false})
        console.log(deleteDevice.deletedCount)
        if(deleteDevice.deletedCount > 0) {
            res.status(200).json(deleteDevice.deletedCount)
        }
        else {
            res.status(404).send({"ERROR":"Não Deletado"})
        }
    }catch(err){
        res.status(404).send({"ERROR":"Não Deletado"})
    }

}


