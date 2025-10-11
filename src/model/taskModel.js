import { ObjectId } from 'mongodb'
import { GET_DB } from '../../build/src/config/mongodb'
const createNew = async (newTask) => {
  try {
    const result = await GET_DB().collection('tasks').insertOne(newTask)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findOneByID = async (ID) => {
  try {
    const result = await GET_DB().collection('tasks').findOne({
      _id: new ObjectId(ID)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getTasks = async () => {
  try {
    const result = await GET_DB().collection('tasks').find({
      _destroy: false
    }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteTask = async (id) => {
  try {
    const result = await GET_DB().collection('tasks').findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: { _destroy: true }
      } )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateTask = async (id, reqBody) => {
  try {
    const result = await GET_DB().collection('tasks').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...reqBody } },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const taskModel = { createNew, findOneByID, getTasks, deleteTask, updateTask }