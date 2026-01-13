import app from './app'
import connectDB from './dbconfig/db'
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000

// Connect to the database before starting the server
connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})