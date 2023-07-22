import { Devices_Model } from '../model/Devices.model.js'




export const FindAllDevices = async (req,res) => {
    try{
        const findAll =  await Devices_Model.find({})
        res.status(200).json(findAll)
    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}





export const getDevicesById = async (req,res) => {
    let id = req.params.id;

    try{
        const findbyId =  await Devices_Model.findById(id)
        res.status(200).json(findbyId)
    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}





export const createDevice = async (req,res) => {

    let device = {
        ipaddress: req.body.ipaddress,
        password: req.body.password,
        user: req.body.user,
    }

    try{
        const deviceNew = new Devices_Model(device)
        const newData = await deviceNew.save();
        res.status(200).json(newData)

    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}




export const updateDevice = async (req,res) => {

    let device = {
        ipaddress: req.body.ipaddress,
        password: req.body.password,
        user: req.body.user,
    }

    try{
        const deviceNew = new Devices_Model(device)
        const newData = await deviceNew.save();
        res.status(200).json(newData)

    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}




export const deleteDevice = async (req,res) => {

    let device = {
        ipaddress: req.body.ipaddress,
        password: req.body.password,
        user: req.body.user,
    }

    try{
        const deviceNew = new Devices_Model(device)
        const newData = await deviceNew.save();
        res.status(200).json(newData)

    }catch (err) {
        res.status(503).send({"ERROR":"contact the administrator"})
    }
}










