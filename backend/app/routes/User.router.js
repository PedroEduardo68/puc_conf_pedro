
import {Router} from 'express'

import { RegisterUser , LoginUser , RouterProtectUser, verifyToken} from '../controller/User.controll.js';


const UserRouter = Router()


UserRouter.post('/register',RegisterUser)  


UserRouter.post('/login', LoginUser)  


//UserRouter.get('/RouterProtect', , RouterProtectUser)  

export default UserRouter;