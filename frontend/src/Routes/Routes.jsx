import { createBrowserRouter } from 'react-router-dom'
import Chat from '../Pages/Chat'
import Home from '../Pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/chat/:chatCode',
    element: <Chat />
  }
])

export default router
