import express from 'express'
import taskRouter from './src/task/task.route.js'
import { connectDB } from './src/config/db.js'
import userRouter from './src/user/user.route.js'
import cors from 'cors'
const app = express()
const port = 3000

try {
  connectDB()
  console.log('Connected to DB')
} catch (err) {
  console.error(err)
  process.exit()
}

app.use(express.json())
app.use(cors())

app.use('/api/tasks', taskRouter)
app.use('/api/users', userRouter)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    message: err.message
  })
})

app.listen(port, () => {
  console.log(`Todo App is running on port ${port}`)
})
