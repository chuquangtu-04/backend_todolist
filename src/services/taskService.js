/* eslint-disable no-console */
import { taskModel } from '~/model/taskModel'

const createNew = async (reqBody) => {
  try {
    const newTask = {
      ...reqBody,
      completed: 'NOTCOMPLETED',
      _destroy: false,
      updatedAt: Date.now(),
      createdAt: Date.now()
    }
    const createTask = await taskModel.createNew(newTask)
    const getNewBoard = await taskModel.findOneByID(createTask.insertedId.toString())
    return getNewBoard
  } catch (error) {
    console.error('Lỗi khi gọi Service Create New', error)
    throw new Error(error)
  }
}

const getTasks = async () => {
  try {
    const result = await taskModel.getTasks()
    return result
  } catch (error) {
    console.error('Lỗi khi gọi Service Fetch Task', error)
    throw new Error(error)
  }
}

const deleteTask = async (id) => {
  try {
    const result = await taskModel.deleteTask(id)
    return result
  } catch (error) {
    console.error('Lỗi khi gọi Service Delete Task', error)
    throw new Error(error)
  }
}

const updateTask = async (id, reqBody) => {
  try {
    const newTask = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const result = await taskModel.updateTask(id, newTask)
    return result
  } catch (error) {
    console.error('Lỗi khi gọi Service Update Task', error)
    throw new Error(error)
  }
}
const searchTask = async (queryFilters) => {
  try {
    const res = await taskModel.searchTask(queryFilters)
    const result = []
    res.forEach(task => (
      result.push({
        _id: task._id,
        value: task.taskName,
        label: task.taskName
      })
    ))
    return result
  } catch (error) {
    console.error('Lỗi khi gọi Service Update Task', error)
    throw new Error(error)
  }
}
export const taskService = { createNew, getTasks, deleteTask, updateTask, searchTask }