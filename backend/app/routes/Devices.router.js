// GET: / | displayHome()
// GET: /Devices | getUsers()
// GET: /Devices/:id | getUserById()
// POST: /Devices | createUser()
// PUT: /Devices/:id | updateUser()
// DELETE: /Devices/:id | deleteUser()7

import {Router, request, response} from 'express'
import {FindAllDevices, getDevicesById, createDevice , updateDevice, deleteDevice } from '../controller/Devices.controll.js'

const DevicesRouter = Router()


//Find all devices
DevicesRouter.get('/', FindAllDevices)  

//Find devices by id 
DevicesRouter.get('/:id', getDevicesById)  

//Create device
DevicesRouter.post('/', createDevice)  

//update  device
DevicesRouter.put('/:id', updateDevice)  

//delete device
DevicesRouter.delete('/:id', deleteDevice)  


export default DevicesRouter;