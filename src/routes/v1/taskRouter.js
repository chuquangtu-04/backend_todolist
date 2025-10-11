import express from 'express'
import { taskController } from '~/controllers/taskController'
const Router = express.Router()

Router.route('/')
  .post(taskController.createNew)
  .get(taskController.fetchTasks)
Router.route('/:id')
  .patch(taskController.deleteTask)
Router.route('/update-task/:id')
  .patch(taskController.updateTask)

export const taskRouter = Router