import express from 'express'
import { Task } from './task.model.js'
import { auth } from '../middleware/auth.js'
import {
  taskCreateValidator,
  taskGetValidator,
  taskUpdateValidator
} from './task.validator.js'
import handleValidation from '../middleware/validate.js'

const router = express.Router()

router.post(
  '/create/:userId',
  auth,
  taskCreateValidator,
  handleValidation,
  async (req, res, next) => {
    const requestUserId = req.params.userId
    const tokenUserId = req.userId

    if (requestUserId.toString() !== tokenUserId.toString()) {
      const error = new Error('Not Allowed to create task')
      error.statusCode = 403
      next(error)
      return
    }

    const { name, content, priority, date } = req.body

    if (!name || !content || !priority || !date) {
      res.status(400).json({ message: 'All fields are required' })
    }

    try {
      const result = await Task.create({
        name,
        content,
        priority,
        date
      })

      if (result) {
        res.status(200).json({
          message: 'Task created successfully',
          id: result._id
        })
      } else {
        res.status(500).json({ message: 'Error' })
      }
    } catch (err) {
      console.error('Error while creating task', err)
      res.status(500).json({ message: 'Error while creating task' })
    }

    //   res.json({ message: 'Task created' })
  }
)
router.get('/get_all', taskGetValidator, handleValidation, async (req, res) => {
  const pageNumber = Number(req.query.page) || 1
  const responseLength = Number(req.query.limit) || 5

  const noOfDocumentsToSkip = (pageNumber - 1) * responseLength

  const noOftotalTasks = await Task.countDocuments()
  const totalPages = noOftotalTasks / responseLength

  const tasks = await Task.find({})
    .skip(noOfDocumentsToSkip)
    .limit(responseLength)

  if (tasks.length > 0) {
    res.status(200).json({
      totalTasks: noOftotalTasks,
      currentPage: pageNumber,
      totalPages: totalPages,
      tasks: tasks
    })
  } else {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
})
router.get('/get_one/:taskId', async (req, res, next) => {
  const taskId = req.params.taskId

  try {
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
      const error = new Error('Unable to get Task')
      error.statusCode = 400
      next(error)
      return
    }
    res.json(task)
  } catch (err) {
    next(err)
    return
  }
})
router.patch(
  '/update/:taskId/:userId',
  auth,
  taskUpdateValidator,
  handleValidation,
  async (req, res, next) => {
    const requestUserId = req.params.userId
    const tokenUserId = req.userId

    if (requestUserId.toString() !== tokenUserId.toString()) {
      const error = new Error('Not Allowed to Update task')
      error.statusCode = 403
      next(error)
      return
    }

    try {
      const id = req.params.taskId
      const updates = req.body

      const updateTask = await Task.findByIdAndUpdate(id, updates, {
        new: true
      })

      if (!updateTask)
        return res.status(404).json({
          message: 'Taks not found'
        })
      res.json({
        message: 'Task updated successfully',
        updateTask
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
)
router.delete('/del/:taskId/:userId', auth, async (req, res) => {
  const requestUserId = req.params.userId
  const tokenUserId = req.userId

  if (requestUserId.toString() !== tokenUserId.toString()) {
    const error = new Error('Not Allowed to delete task')
    error.statusCode = 403
    next(error)
    return
  }

  try {
    const id = req.params.taskId

    const deleteTask = await Task.findByIdAndDelete(id)

    if (!deleteTask)
      return res.status(404).json({
        message: 'Task not found'
      })
    res.json({
      message: 'Task Deleted successfully',
      deletedTask: deleteTask
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
