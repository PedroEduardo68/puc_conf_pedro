
import {Router} from 'express'
import { getAllHistoryFilesFalied, getAllHistoryFilesSucess, setcleanAllHistoryFilesFalied, setcleanAllHistoryforIDfileRes } from '../controller/History.controll.js';


const HistoryRouter = Router()


//Find history files
HistoryRouter.get('/', getAllHistoryFilesSucess)  

HistoryRouter.get('/falied', getAllHistoryFilesFalied)  

HistoryRouter.get('/falied/clean', setcleanAllHistoryFilesFalied)  

HistoryRouter.get('/findandremovebyid/:id', setcleanAllHistoryforIDfileRes)  


export default HistoryRouter;