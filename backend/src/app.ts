import dotenv from 'dotenv'
import express from 'express'
import logger from './config/pino-pretty'
import cors from 'cors'
import databaseConnect from './config/mongoConnection'

dotenv.config()

if (!process.env.PORT) {
  logger.error('Porta não encontrada')
  process.exit(1)
}

const PORT = parseInt(process.env.PORT)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.listen(PORT, () => {
  logger.info(`Running on port ${PORT}`)
  databaseConnect()
})
