import { Request, Response } from 'express'
import fs from 'fs'
import crypto from 'crypto'
import ConversationModel from './schemas'
import { IConversation } from './interfaces'
import logger from './config/pino-pretty'

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

async function fetchConversation (req: Request, res: Response) {}

async function sendMessage (req: Request, res: Response) {}

async function fetchMessages (req: Request, res: Response) {}

export default { createConversation, fetchConversation, sendMessage, fetchMessages }
