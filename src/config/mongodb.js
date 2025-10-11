/* eslint-disable no-console */
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

let todoappDatabaseInstance = null
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  todoappDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
export const GET_DB = () => {
  if (!todoappDatabaseInstance) throw new Error('Must connect to Database first!')
  return todoappDatabaseInstance
}
