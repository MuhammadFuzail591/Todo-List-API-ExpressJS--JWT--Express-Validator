import express from 'express'
import { User } from '../../src/user/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userCreateValidator, userLoginValidator } from './user.validator.js'
import handleValidation from '../middleware/validate.js'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})

    res.status(201).json(users)
  } catch (err) {
    next(err)
  }
})
router.post(
  '/create',
  userCreateValidator,
  handleValidation,
  async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      const error = new Error('All fields are required')
      error.statusCode = 401
      next(error)
    }

    try {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      const result = await User.create({
        name,
        email,
        password: hash
      })

      res.status(201).json({
        message: 'User created successfully..!',
        id: result._id
      })
    } catch (err) {
      next(err)
      return
    }
  }
)
router.post(
  '/login',
  userLoginValidator,
  handleValidation,
  async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
      const error = new Error('All fields are required')
      error.statusCode = 401
      next(error)
    }

    try {
      const user = await User.findOne({
        email
      }).select('+password')

      if (!user) {
        const error = new Error('Invalid Credentials')
        error.statusCode = 400
        next(error)
        return
      }

      const matched = await bcrypt.compare(password, user.password)
      if (!matched) {
        const error = new Error('Invalid Credentials')
        error.statusCodd = 400
        next(error)
        return
      } else {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: 60 * 60
        })

        res.status(201).json({
          message: 'Login Successful',
          token: token
        })
      }
    } catch (err) {
      next(err)
    }
  }
)

export default router
