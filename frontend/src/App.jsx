import React, { useEffect, useState, useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { socket } from './config/api'
import Chat from './Pages/Chat';
import Home from './Pages/Home';

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    socket.on('new message', (item) => {
      setMessage(item);
    })

    return () => {
      socket.off('new message')
    }
  }, [])

  const routerFunction = useMemo(() => {
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
  }, [message])

  return (
    <React.StrictMode>
      <RouterProvider router={routerFunction} />
    </React.StrictMode>
  )
}

export default App
