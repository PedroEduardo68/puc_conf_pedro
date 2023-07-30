
import {Router} from 'express'
import { createFiles , getFilesByIdDevices, deleteFiles, ViewFile, DownloadFileGet} from '../controller/Files.controll.js'



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



//download file
FilesRouter.get('/download/:file', DownloadFileGet )  


//View Files
FilesRouter.get('/viewfile/:id', ViewFile)  


export default FilesRouter;