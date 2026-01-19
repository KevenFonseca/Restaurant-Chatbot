import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import chatRouter from './chat/chatRouter'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Chat routes
app.use('/chat', chatRouter)

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Restaurant ChatBot is running!')
})

export default app