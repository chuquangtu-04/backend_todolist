import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { taskRouter } from './taskRouter'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'you access about', code: StatusCodes.OK })
})
Router.use('/task', taskRouter)
export const APIs_v1 = Router