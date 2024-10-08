import { Request, Response } from 'express'
import crypto from 'crypto'
import ConversationModel from './schemas'
import { IConversation, IMessage } from './interfaces'
import logger from './config/pino-pretty'
import socket from './config/socket'

function hashName (input: string) {
  const hash = crypto.createHash('sha256').update(input).digest('hex')
  return hash.slice(0, 10)
}

async function createConversation (req: Request, res: Response, next: Function) {
  try {
    const { body } = req

    if (!body || !body?.name) throw new Error('Nickname not sent!')
    
    const code = hashName(body.name)

    const oldConversation = await ConversationModel.findOne({ code }).exec()
    if (oldConversation)  return res.status(200).send({ conversation: oldConversation })

    const obj: IConversation = {
      code,
      messages: []
    }

    const conversation = await ConversationModel.create(obj)
    return res.status(201).send({ conversation })
  } catch (error) {
    return next(error)
  }
}

async function fetchConversation (req: Request, res: Response, next: Function) {
  try {
    const { code } = req.params

    if (!code) throw new Error('Não foi possível obter o código da conversa')

    const conversation = await ConversationModel.findOne({ code }).exec()

    if (!conversation) throw new Error('Chat not found!')

    return res.status(200).send({ conversation })
  } catch (error) {
    return next(error)
  }
}

async function socketMessage (code: string, message: IMessage) {
  try {
    if (!code) throw new Error('Não foi possível obter o código da conversa')

    const conversation = await ConversationModel.findOne({ code }).exec()

    if (!conversation) throw new Error('Não foi possível encontrar a conversa solicitada')

    conversation.messages = [...conversation.messages, message] as any

    await conversation.save()
    socket.emit('message saved', message)
    socket.emit('new message', message)
  } catch (error) {
    logger.error(error)
  }
}

async function sendMessage (req: Request, res: Response) {
  try {
    const { body, params } = req
    const { code } = params

    if (!code) throw new Error('Não foi possível obter o código da conversa')
    if (!body) throw new Error('Campos inválidos!')

    const conversation = await ConversationModel.findOne({ code }).exec()

    if (!conversation) throw new Error('Não foi possível encontrar a conversa solicitada')

    const message: IMessage = {
      text: body.text as string,
      sender: body.sender as string
    }

    conversation.messages = [...conversation.messages, message] as any

    await conversation.save()
    socket.emit('new message', message)

    return res.status(201).send({ conversation })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error })
  }
}

async function fetchMessages (req: Request, res: Response) {
  try {
    const PAGE_SIZE = 50
    const { code, page } = req.params
    const pageNumber = Number(page) ?? 1
    
    if (!code) throw new Error('Não foi possível obter o código da conversa')

    const conversation = await ConversationModel.findOne({ code }).slice('messages',  PAGE_SIZE).select('messages').exec()

    if (!conversation) throw new Error('Não foi possível encontrar a conversa solicitada')

    return res.status(200).send({ conversation })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error })
  }
}

export default { createConversation, fetchConversation, sendMessage, fetchMessages, socketMessage }
