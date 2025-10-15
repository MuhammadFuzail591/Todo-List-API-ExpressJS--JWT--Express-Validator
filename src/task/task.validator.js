import { body, param } from 'express-validator'

export const taskCreateValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is Required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  body('priority')
    .trim()
    .notEmpty()
    .withMessage('Priority should not be empty.')
    .isIn(['high', 'medium', 'low'])
    .withMessage('The priority should be low, medium or high'),

  body('date')
    .notEmpty()
    .withMessage('Date should not be empty.')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Invalid Date Format, should be YYYY-MM-DD')
]

export const taskUpdateValidator = [
  param('userId')
    .trim()
    .notEmpty()
    .withMessage('User ID is required.')
    .isMongoId()
    .withMessage('Invalid User ID format.'),

  param('taskId')
    .trim()
    .notEmpty()
    .withMessage('Task ID is required.')
    .isMongoId()
    .withMessage('Invalid Task ID format.'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name should not be empty if provided.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.'),

  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content should not be empty if provided.')
    .isLength({ min: 3 })
    .withMessage('Content must be at least 3 characters long.'),

  body('priority')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Priority should not be empty if provided.')
    .isIn(['high', 'medium', 'low'])
    .withMessage('Priority must be one of: low, medium, or high.'),

  body('date')
    .optional()
    .notEmpty()
    .withMessage('Date should not be empty if provided.')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Invalid date format. Expected YYYY-MM-DD.')
]
