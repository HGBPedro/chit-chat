import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'dd/mm/yyyy HH:MM:ss'
    }
  }
})

export default logger
