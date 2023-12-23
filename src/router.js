import { Router } from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import multer from 'multer';
import configUpload from './config/upload'
import Dashboard from './controllers/Dashboard';
import ReserveController from './controllers/ReserveController';

const routes = new Router()
const upload = multer(configUpload)

routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail') ,HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:id_house', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses/:id_house', HouseController.destroy);

routes.get('/dashboard', Dashboard.show)

routes.post('/house/:id_house/reserve', ReserveController.store);
export default routes;
