import { createBrowserRouter } from 'react-router-dom'
import Home from '../Pages/Home'
import ChatHalfway from '../Pages/ChatHalfway'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/chat/join',
    element: <ChatHalfway />
  }
])

export default router
