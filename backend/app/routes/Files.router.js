// GET: / | displayHome()
// GET: /Devices | getUsers()
// GET: /Devices/:id | getUserById()
// POST: /Devices | createUser()
// PUT: /Devices/:id | updateUser()
// DELETE: /Devices/:id | deleteUser()7

import {Router} from 'express'
import { createFiles , getFilesByIdDevices, deleteFiles} from '../controller/Files.controll.js'

const FilesRouter = Router()


// //Find all devices
// FilesRouter.get('/', FindAllFiles)  

// //Find devices by id 
// FilesRouter.get('/:id', getFilesById)  

//Create device
FilesRouter.post('/', createFiles)  

// //update  device
// FilesRouter.put('/:id', updateFiles)  

//delete device
FilesRouter.delete('/:id', deleteFiles)  


//Find devices by id 
FilesRouter.get('/device/:id', getFilesByIdDevices)  





export default FilesRouter;