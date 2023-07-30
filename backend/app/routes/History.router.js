
import {Router} from 'express'
import { getAllHistoryFilesSucess } from '../controller/History.controll.js';


const HistoryRouter = Router()


//Find history files
HistoryRouter.get('/', getAllHistoryFilesSucess)  



export default HistoryRouter;