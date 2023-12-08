import express from 'express'
import controller from './controller'

const router = express.Router()

router.get('/:code', controller.fetchConversation)
router.post('/create', controller.createConversation)
router.get('/:code/messages', controller.fetchMessages)
router.post('/:code/messages', controller.sendMessage)

export default router
