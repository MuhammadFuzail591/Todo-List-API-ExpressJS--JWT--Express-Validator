import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

export const Task = mongoose.model('Task', taskSchema)
