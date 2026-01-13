import express, { Request, Response } from 'express'

const app = express()

// Middleware
app.use(express.json())

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Restaurant ChatBot is running!')
})

export default app