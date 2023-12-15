import { Router } from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import multer from 'multer';
import configUpload from './config/upload'

const routes = new Router()
const upload = multer(configUpload)

routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail') ,HouseController.store);
export default routes;
