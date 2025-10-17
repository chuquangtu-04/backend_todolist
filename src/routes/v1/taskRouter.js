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
Router.route('/search-task')
  .get(taskController.searchTask)

export const taskRouter = Router