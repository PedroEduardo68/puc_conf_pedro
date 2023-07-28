import { Devices_Model } from "../model/Devices.model.js"
import { Files_Model } from "../model/Files.model.js"


// export const FindAllDevices = async (req,res) => {
//     try{
//         const findAll =  await Files_Model.find({})
//         res.status(200).json(findAll)
//     }catch (err) {
//         res.status(503).send({"ERROR":"contact the administrator"})
//     }
// }



    export const getFilesByIdDevices = async (req,res) => {
        let id = req.params.id;

        try{
            const findbyId =  await Files_Model.find({iddevice:id})
            res.status(200).json(findbyId)
        }catch (err) {
            res.status(503).send({"ERROR":"contact the administrator"})
        }
    }







export const createFiles = async (req,res) => {

    let file = {
        nameFile: req.body.nameFile,
        sourcefileRemote: req.body.sourcefileRemote,
        iddevice: req.body.deviceid,
    }
    try{
        const fileNew = new Files_Model(file)
        let newData = await fileNew.save();
        res.status(200).json(newData)
        

    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }

}
            




// export const updateFiles = async (req,res) => {

//     let file = {
//         ipaddress: req.body.ipaddress,
//         password: req.body.password,
//         user: req.body.user,
//     }

//     try{
//         const deviceNew = new Files_Model(device)
//         const newData = await deviceNew.save();
//         res.status(200).json(newData)

//     }catch (err) {
//         res.status(503).send({"ERROR":"contact the administrator"})
//     }
// }




/**
 * The function `deleteDevice` is an asynchronous function that deletes a device from the database
 * based on the provided ID and returns the number of deleted devices or an error message if the device
 * is not found.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request headers, request body, request parameters, etc. In this
 * case, `req.params.id` is used to extract the `id` parameter from the request URL.
 * @param res - The 'res' parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or sending an error message.
 */

export const deleteFiles = async (req,res) => {
    let fileId = req.params.id;
    const deletefile= await Files_Model.deleteOne({_id: fileId})

    if(deletefile.deletedCount > 0) {
        res.status(200).json(deletefile.deletedCount)
    }
    else {
        res.status(404).send({"ERROR":"Dispositivo não encontrado!"})
    }
}



