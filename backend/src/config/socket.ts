import { Server } from 'socket.io'
import logger from './pino-pretty'
import controller from '../controller'

const PORT = 5002

const socket = new Server(Number(PORT), {
cors: {
    origin: "http://10.243.170.95:3132",
    methods: ["GET", "POST"],
    credentials: true
  }})

socket.on('connection', socket => {
  logger.info(`User ${socket.handshake.address} connected`)

  socket.on('new message', (code, message) => {
    console.log('message received')
    controller.socketMessage(code, message)
    socket.broadcast.emit('new message', message)
  })
})

socket.on('disconnection', socket => {
  logger.info(`User ${socket.handshake.address} disconnected`)
})



export default socket
