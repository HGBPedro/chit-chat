import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../config/api'
import ErrorMessage from '../Components/ErrorMessage'
import LoadingBar from '../Components/LoadingBar'
import cookieHandler from '../Hooks/cookieHandler'
import NicknameConfig from '../Components/NicknameConfig'
import Layout from '../Components/Layout'

function CreateChat () {
  const { cookies, fetchCookie } = cookieHandler()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [nickname, setNickname] = useState(fetchCookie('nickname'))
  const [chatCode, setChatCode] = useState('')
  const abortController = new AbortController()

  const handleChatCreate = async (name) => {
    setIsLoading(true)
    try {
      setError(undefined)

      const reqBody = { name }
      const response = await api.post(`/chat/create`, reqBody, { signal: abortController.signal })
      const { code } = response.data.conversation
      setChatCode(code)
      return navigator.clipboard.writeText(code)
    } catch (err) {
      if (!abortController.signal.aborted) {
        const { error } = err.response.data
        setError(error)
        setIsLoading(false)
      }
    }
  }

  const handleStopLoading = () => setIsLoading(false)

  const handleNicknameChange = () => {
    const nicknameCookie = fetchCookie('nickname')
    if (nicknameCookie) {
      setNickname(nicknameCookie)
      handleChatCreate(nicknameCookie)
    }
  }

  if (error) return <ErrorMessage error={error} /> 

  if (isLoading) return <LoadingBar placeholder='Criando chat' callback={handleStopLoading} /> 

  if (!nickname) return <NicknameConfig />

  return (
    <div className='container'>
      <h3>&gt; This code below is used for joining this specific conversation</h3>
      <div className='input-container'>
        <div>
          <span className='prefix'>&gt;</span>
          <input className='input' value={chatCode} readOnly/>
        </div>
        <button id='proceed-button' className='proceed-button'>
          Proceed
        </button>
      </div>
    </div>
  )
}

function FindChat () {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const inputRef = React.useRef('')
  const abortController = new AbortController()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    inputRef.current = e.target.value
    if (inputRef.current.length >= 10) return document.getElementById('proceed-button').focus()
  }

  const handleChatFetch = async () => {
    setIsLoading(true)
    try {
      setError(undefined)
      const response = await api.get(`/chat/${inputRef.current}`, { signal: abortController.signal })
      const { conversation } = response.data
      if (!conversation) throw { response: { data: { error: { name: 'Error', message: 'Não foi possível encontrar a conversa solicitada' } } } }
      document.cookie = `messages=${JSON.stringify(conversation.messages)};`
      setIsLoading(false)
      return navigate('/chat/join', { state: { mode: 'join' } })
    } catch (err) {
      if (!abortController.signal.aborted) {
        const { error } = err.response.data
        setError(error)
        setIsLoading(false)
      }
    }
  }
    
  return (
    <div className='container'>
      <h3>&gt; Type the chat code to join</h3>
      {error && (
        <ErrorMessage error={error} />
      )}
      <div className='input-container'>
        <div>
          <span className='prefix'>&gt;</span>
          <input className='input' maxLength={10} onChange={handleInputChange} disabled={isLoading} />
        </div>
        <button id='proceed-button' className='proceed-button' onClick={handleChatFetch} disabled={isLoading}>
          Find
        </button>
      </div>
    </div>
  )
}

function ChatHalfway() {
  const { state } = useLocation()

  return (
    <Layout>
      {state.mode === 'create' ? (
        <CreateChat />
      ) : (
        <FindChat />
      )}
    </Layout>
  )
}

export default ChatHalfway
