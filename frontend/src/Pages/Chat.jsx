import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { api, socket } from '../config/api'
import Layout from '../Components/Layout.jsx'
import Prefix from '../Components/LinePrefix.jsx'
import cookieHandler from '../Hooks/cookieHandler'
import Input from '../Components/Input'

function Chat ({ message }){
  const { chatCode } = useParams()
  const { fetchCookie } = cookieHandler()
  const [conversation, setConversation] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const nickname = fetchCookie('nickname')

  useEffect(() => {
    if (chatCode) {
      Promise.all([fetchChatInfo(chatCode)])
    }
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => console.log(message), [message])

  const fetchChatInfo = async (code) => {
    try {
      const response = await api.get(`/chat/${code}`)
      const { conversation } = response.data
      setConversation(conversation)
      setIsLoading(false)
    } catch (err) {
      setConversation([ ...conversation, { sender: 'ERROR', text: err.message }])
    }
  }

  const sendMessage = (text) => {
    const message = { sender: nickname, text }
    socket.emit('new message', chatCode, message)
  }

  
  useMemo(() => {
    if (message) {
      function appendMessage (message) {
        return setConversation({ ...conversation, messages: [ ...conversation?.messages, message ] })
      }

      appendMessage(message)
    }
  },[message])


  if (isLoading) return <Layout><p>Loading...</p></Layout>

  return (
    <Layout>
      {conversation.messages.map((item, idx) => {
        return (
          <p className='flex' key={`message-item-${idx}`}>
            <Prefix text={item.sender}/>{item.text}
          </p>
        )
      })}
      <p className='flex'>
        <Prefix text={nickname} />
        <Input callback={sendMessage}/>
      </p>
    </Layout>
  )
}

export default Chat
