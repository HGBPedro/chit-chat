import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../config/api'
import ErrorMessage from '../Components/ErrorMessage'

function JoinChat () {
  const inputRef = React.useRef('')

  const handleInputChange = (e) => {
    inputRef.current = e.target.value
  }

  const handleNickname = () => {
    return document.cookie = `nickname=${inputRef.current};`
  }

  return (
    <div className='container'>
      <h3>&gt; Type your nickname for identification</h3>
      <div className='input-container'>
        <div>
          <span className='prefix'>&gt;</span>
          <input className='input' onChange={handleInputChange} />
        </div>
        <button id='proceed-button' className='proceed-button' onClick={handleNickname}>
          Join
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
    <div className='chat-halfway'>
      {state.mode === 'join' ? (
        <JoinChat />
      ) : (
        <FindChat />
      )}
    </div>
  )
}

export default ChatHalfway
