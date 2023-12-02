import mongoose from 'mongoose'
import logger from './pino-pretty'

const databaseConnect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@chitchatcluster.rlkwosh.mongodb.net/chit-chat`)
    return logger.info('DATABASE CONNECTED')
  } catch (err) {
    logger.error(err)
  }
}

export default databaseConnect
