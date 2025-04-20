import express from 'express';
import userController from './userController.js';
import authenticate from './authenticate.js'; 
const routes = express.Router();

routes.post('/saveuser', userController.signup);
routes.post('/verify',userController.verifyotpAndSave)
routes.post('/login', userController.login);
routes.get('/getuserinfo',authenticate,userController.getUserInfo);

export default routes; 
