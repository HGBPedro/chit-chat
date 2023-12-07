import express from 'express'
import controller from './controller'

const router = express.Router()

router.post('/create', controller.createConversation)

export default router
