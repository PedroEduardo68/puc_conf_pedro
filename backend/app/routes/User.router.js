
import {Router} from 'express'

import { RegisterUser , LoginUser , RouterProtectUser, verifyToken} from '../controller/User.controll.js';


const UserRouter = Router()


UserRouter.post('/register',verifyToken, RegisterUser)  


UserRouter.post('/login', LoginUser)  


UserRouter.get('/RouterProtect', verifyToken, RouterProtectUser)  

export default UserRouter;