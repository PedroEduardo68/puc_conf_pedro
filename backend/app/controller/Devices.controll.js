import { Devices_Model } from '../model/Devices.model.js'
import { deleteFilesforDeviceID } from './Files.controll.js'



/**
 * The function FindAllDevices retrieves all devices from the Devices_Model and sends them as a JSON
 * response.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, query
 * parameters, and body.
 * @param res - The "res" parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */

export const FindAllDevices = async (req,res) => {
    try{
        const findAll =  await Devices_Model.find({})
        res.status(200).json(findAll)
    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}





/**
 * The function `getDevicesById` retrieves a device by its ID from the database and sends it as a JSON
 * response, or returns an error message if there is an issue with the database connection.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, and request body. In this case,
 * `req.params.id` is used to extract the `id` parameter from the request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */
export const getDevicesById = async (req,res) => {
    let id = req.params.id;

    try{
        const findbyId =  await Devices_Model.findById(id)
        res.status(200).json(findbyId)
    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}




/**
 * The function creates a new device by saving the provided device information in the database and
 * returns the newly created device data.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending data back to the client.
 */

export const createDevice = async (req,res) => {
    

    let device = {
        ipaddress: req.body.ipaddress,
        password: req.body.password,
        user: req.body.user,
        nameserver: req.body.nameserver
    }

    try{
        const deviceNew = new Devices_Model(device)
        const newData = await deviceNew.save();
        res.status(200).json(newData)

    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}




/**
 * The function updates a device's information in a database and returns the updated information.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * request, such as the request body, headers, and query parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code and sending JSON data.
 */
export const updateDevice = async (req,res) => {

    let device = {
        nameserver: req.body.nameserver,
        ipaddress: req.body.ipaddress,
        password: req.body.password,
        user: req.body.user,
    }

    try{
        const updateInfo =await Devices_Model.findByIdAndUpdate(req.params.id, device, { new: true })
        res.status(200).json(updateInfo)

    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}



/**
 * The function `deleteDevice` is an asynchronous function that deletes a device from the database
 * based on the provided device ID.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, URL, and
 * parameters.
 * @param res - The 'res' parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this code snippet, it is used to send different responses based on the
 * outcome of
 */

export const deleteDevice = async (req,res) => {
    try{
        let deviceId = req.params.id;
        const deleteDevice = await Devices_Model.deleteOne({_id: deviceId})
        deleteFilesforDeviceID(deviceId)
        if(deleteDevice.deletedCount > 0) {
            res.status(200).json(deleteDevice.deletedCount)
        }
        else {
            res.status(404).send({"ERROR":"Dispositivo não encontrado!"})
        }
    }catch{
        res.status(404).send({"ERROR":"Dispositivo não encontrado!"})
    }

}



