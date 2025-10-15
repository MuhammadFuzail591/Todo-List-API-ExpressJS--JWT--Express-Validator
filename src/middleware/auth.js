import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    const err = new Error('not Authenticated')
    err.statusCode = 401
    return next(err)
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = decoded.id
    return next()
  } catch (err) {
    err.statusCode = 401
    next(err)
    return
  }
}
