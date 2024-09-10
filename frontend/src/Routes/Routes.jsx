import { createBrowserRouter } from 'react-router-dom'
import Chat from '../Pages/Chat'
import Home from '../Pages/Home'

function router (message) {
  return createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/chat/:chatCode',
      element: <Chat message={message} />
    }
  ])
}

export default router
