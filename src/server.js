/* eslint-disable no-console */
import express from 'express'
import { env } from './config/environment'
import { APIs_v1 } from './routes/v1'
import { CONNECT_DB } from '~/config/mongodb'
import cors from 'cors'
const app = express()

const START_SERVER = () => {
  app.get('/', (req, res) => {
    res.send('<h1>Đây là TodoApp</h1>')
  })

  app.use(express.json())

  // ✅ Cho phép tất cả origin (dành cho dev)
  app.use(cors({ origin: 'http://localhost:5173' }))

  app.use('/v1', APIs_v1)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Hello ${env.AUTHOR} I am running at ${ process.env.PORT } on Production`)
    })} else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`Hello ${env.AUTHOR} I am runing at ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT} on local Dev `)
    })
  }
}
CONNECT_DB()
  .then(() => { console.log('Connected  to mongoDB atlas!')})
  .then(() => START_SERVER())
  .catch(error => console.error(error))

