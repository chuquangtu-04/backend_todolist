import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
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

const searchTask = async (queryFilters) => {
  try {
    const queryConditions = [{ _destroy: false }]
    // Xử lý query filter cho từng trường hợp search board, ví dụ theo title
    if (queryFilters) {
      Object.keys(queryFilters).forEach( key => {
        // queryFilters[key] ví dụ queryFilters[title] nếu phía FE đẩy lên q[title]
        // Có phân biệt chữ hoa và chữ thường
        // queryConditions.push({
        //   [key]: { $regex: queryFilters[key] }
        // })
        // Không phân biệt
        queryConditions.push({
          [key]: { $regex: new RegExp(queryFilters[key], 'i') }
        })
      })
    }
    const result = await GET_DB().collection('tasks').aggregate(
      [{ $match: { $and: queryConditions } }]
    ).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const taskModel = { createNew, findOneByID, getTasks, deleteTask, updateTask, searchTask }