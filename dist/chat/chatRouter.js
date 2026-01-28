import { Router } from 'express';
import chatController from './chatController.js';
import deviceMiddleware from '../middlewares/deviceMiddleware.js';
const chatRouter = Router();
chatRouter.post('/', deviceMiddleware, chatController);
export default chatRouter;
