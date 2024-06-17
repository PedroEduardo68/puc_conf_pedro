
import { Files_Model } from "../model/Files.model.js"

import { getViewFilesById } from "../services/ReadFiles/TypeRead.js";

import path from 'path';
import fs from 'fs';
import { setcleanAllHistoryforIDfile } from "./History.controll.js";



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
    setcleanAllHistoryforIDfile(fileId);

    if(deletefile.deletedCount > 0) {
        res.status(200).json(deletefile.deletedCount)
    }
    else {
        res.status(404).send({"ERROR":"Dispositivo não encontrado!"})
    }
}




/**
 * The function `ViewFile` is an asynchronous function that handles a request to view a file by its ID
 * and sends the file data as a response.
 * @param req - The `req` parameter is the request object, which contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, query
 * parameters, and body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
export const ViewFile = async (req, res) => {
    await getViewFilesById(req.params.id,res);
};



export const DownloadFileGet = async (req, res) => {

    const fileName = req.params.file; // Replace with the name of the file you want to download
    const currentFileUrl = import.meta.url;
    const currentDirPath = path.dirname(new URL(currentFileUrl).pathname);
    const filePath = path.join(currentDirPath, '..', 'FilesServers', fileName);
  
    if (!fs.existsSync(filePath)) {
      return res.status(404).end();
    }
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error accessing the file:', err);
        return res.status(500).end();
      }
  
      const fileSize = stats.size;
      const fileStream = fs.createReadStream(filePath);
  
      res.setHeader('Content-Length', fileSize);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  
      fileStream.pipe(res);
    });

}





export const deleteFilesforDeviceID = async (deviceID) => {
    try{
        let fileID = await Files_Model.find({ iddevice: deviceID })
        await setcleanAllHistoryforIDfile(fileID[0].id);
        await Files_Model.deleteMany({_id: fileID[0].id})
    }catch{
        console.log('dont remove file')
    }
}

