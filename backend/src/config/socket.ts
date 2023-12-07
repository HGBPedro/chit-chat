import { Server } from 'socket.io'
import logger from './pino-pretty'

const PORT = 5002

const socket = new Server(Number(PORT), {})

socket.on('connection', socket => {
  logger.info(`User ${socket.handshake.address} connected`)
})

export default socket
