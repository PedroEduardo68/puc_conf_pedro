// GET: / | displayHome()

import {Router} from 'express'
import { backupnowalldevices, backupnowfilesByID } from '../controller/Action.controll.js';


const ActionsRouter = Router()


//Action to all devices
ActionsRouter.get('/', backupnowalldevices)  

//Action to all devices
ActionsRouter.get('/:id', backupnowfilesByID)  





export default ActionsRouter;