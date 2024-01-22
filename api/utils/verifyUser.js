import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'


export const verifyToken = (req, res, next) => {
    const token  = req.cookies.access_token

    if (!token) return next(errorHandler(401, "YOu need to log in"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "you need to  have a token"))
        req.user = user;
        next()
    })
}