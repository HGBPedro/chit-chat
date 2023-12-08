import { Request, Response } from 'express'
import fs from 'fs'
import crypto from 'crypto'
import ConversationModel from './schemas'
import { IConversation, IMessage } from './interfaces'
import logger from './config/pino-pretty'
import { ObjectId } from 'mongoose'

function hashName (input: string) {
  const hash = crypto.createHash('sha256').update(input).digest('hex')
  return hash.slice(0, 10)
}

async function createConversation (req: Request, res: Response) {
  try {
    const { body } = req

    if (!body) throw new Error('Nome de usuário não enviado!')

    const obj: IConversation = {
      code: hashName(body.name),
      messages: []
    }

    const conversation = await ConversationModel.create(obj)
    return res.status(201).send({ conversation })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error })
  }
}

async function fetchConversation (req: Request, res: Response) {
  try {
    const { code } = req.params
    
    if (!code) throw new Error('Não foi possível obter o código da conversa')

    const conversation = await ConversationModel.findOne({ code }).exec()

    if (!conversation) throw new Error('Não foi possível encontrar a conversa solicitada')

    return res.status(200).send({ conversation })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error })
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

    const message: any = {
      text: body.text as string,
      sender: body.sender as string,
      date: new Date().toString() as string
    }

    conversation.messages = [...conversation.messages, message] as any

    await conversation.save()

    return res.status(201).send({ conversation })
  } catch (error) {
    logger.error(error)
    return res.status(400).send({ error })
  }
}

async function fetchMessages (req: Request, res: Response) {}

export default { createConversation, fetchConversation, sendMessage, fetchMessages }
