/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { taskService } from '~/services/taskService'

const createNew = async (req, res) => {
  try {
    const createNew = await taskService.createNew(req.body)
    res.status(StatusCodes.OK).json(createNew)
  } catch (error) {
    console.error('Lỗi khi gọi Controller Create New', error)
    res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

const fetchTasks = async (req, res) => {
  try {
    const createNew = await taskService.getTasks()
    res.status(StatusCodes.OK).json(createNew)
  } catch (error) {
    console.error('Lỗi khi gọi Controller Fetch Task', error)
    res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskID = req.params.id
    const deleteTask = await taskService.deleteTask(taskID)
    res.status(StatusCodes.OK).json(deleteTask)
  } catch (error) {
    console.error('Lỗi khi gọi Controller Delete Task', error)
    res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

const updateTask = async (req, res) => {
  try {
    const taskID = req.params.id
    const updateTask = await taskService.updateTask(taskID, req.body)
    res.status(StatusCodes.OK).json(updateTask)
  } catch (error) {
    console.error('Lỗi khi gọi Controller Update Task', error)
    res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

const searchTask = async (req, res) => {
  try {
    const { q } = req.query
    const queryFilters = q
    const searchTask = await taskService.searchTask(queryFilters)
    res.status(StatusCodes.OK).json(searchTask)
  } catch (error) {
    console.error('Lỗi khi gọi Controller Search Task', error)
    res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}
export const taskController = { createNew, fetchTasks, deleteTask, updateTask, searchTask }