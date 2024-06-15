
import {Router} from 'express'
import { getAllHistoryFilesFalied, getAllHistoryFilesSucess, setcleanAllHistoryFilesFalied } from '../controller/History.controll.js';


const HistoryRouter = Router()


//Find history files
HistoryRouter.get('/', getAllHistoryFilesSucess)  

HistoryRouter.get('/falied', getAllHistoryFilesFalied)  

HistoryRouter.get('/falied/clean', setcleanAllHistoryFilesFalied)  



export default HistoryRouter;