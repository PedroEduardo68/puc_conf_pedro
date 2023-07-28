// GET: / | displayHome()

import {Router} from 'express'
import { backupnowalldevices } from '../controller/Action.controll.js';


const ActionsRouter = Router()


//Action to all devices
ActionsRouter.get('/', backupnowalldevices)  



export default ActionsRouter;