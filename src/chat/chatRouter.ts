import { Router } from 'express'
import chatController from './chatController'
import deviceMiddleware from '../middlewares/deviceMiddleware'

const chatRouter = Router()

chatRouter.post('/', deviceMiddleware, chatController)

export default chatRouter