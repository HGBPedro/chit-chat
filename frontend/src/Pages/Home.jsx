import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import cookieHandler from '../Hooks/cookieHandler';
import { HELP_COMMAND, HOME_TEXTS } from '../constants';
import LinePrefix from '../Components/LinePrefix';
import Input from '../Components/Input';
import ErrorMessage from '../Components/ErrorMessage';
import { api } from '../config/api';

function Home() {
  const navigate = useNavigate()
  const inputRef = React.useRef()
  const { fetchCookie, addCookie } = cookieHandler()
  const { title, subtitle, description } = HOME_TEXTS
  const [lines, setLines] = useState([title, subtitle, description])
  const [nickname, setNickname] = useState('UNSET_USERNAME')
  const abortController = new AbortController()

  useEffect(() => {
    const nicknameCookie = fetchCookie('nickname') 

    if (nicknameCookie) setNickname(nicknameCookie)
    document.getElementById('input-terminal')?.focus()
  }, [])

  const handleRedirect = (mode) => {
    return navigate('/chat/join', { state: { mode } })
  }

  const handleError = (message) => {
    const error = { name: 'ERROR', message }
    return setLines(prev => [...prev, <ErrorMessage err={{ error }} />])
  }

  const handleChatCreate = async () => {
    try {
      const nicknameCookie = fetchCookie('nickname')

      if (!nicknameCookie || nickname === 'UNSET_USERNAME') return handleError('Nickname is not configured')

      const reqBody = { name: nickname }
      const response = await api.post(`/chat/create`, reqBody, { signal: abortController.signal })
      const { code } = response.data.conversation
      setLines(prev => [...prev, `Chat successfully created. Send the code ${code} so others can join (it's already on your clipboard).`])
      return navigator.clipboard.writeText(code)
    } catch (err) {
      if (!abortController.signal.aborted) {
        const { error } = err?.response.data
        handleError(error)
        setIsLoading(false)
      }
    }
  }

  const handleChatJoin = async (code) => {
    try {
      const response = await api.get(`/chat/${code}`, { signal: abortController.signal })
      const { conversation } = response.data
      if (!conversation) throw { response: { data: { error: { name: 'Error', message: 'Não foi possível encontrar a conversa solicitada' } } } }
      document.cookie = `messages=${JSON.stringify(conversation.messages)};`
    } catch (err) {
      if (!abortController.signal.aborted) {
        const { error } = err.response.data
        setIsLoading(false)
      }
    }
  }

  const handleSetNickname = (nickname) => {
    if (!nickname) return handleError('Nickname not inserted')
    addCookie('nickname', nickname.toString())
    return setNickname(nickname.toString())
  }

  const handleIinputValue = (value) => {
    if (!value) return setLines(prev => [...prev, ' '])
    const commands = value.split(' ')

    const commandName = commands[0]

    switch (commandName) {
      case 'join-chat':
        if (commands[2]) {
          handleSetNickname(commands[3])
        }
        return handleChatJoin(commands[1])
      case 'create-chat':
        if (commands[1]) {
          //return handleError('Invalid argument. Use help to see available options')
          handleSetNickname(commands[2])
        }
        return handleChatCreate()
      case 'set-nickname':
        return handleSetNickname(commands[1])
      case 'clear':
        return setLines([])
      case 'help':
        return setLines(prev => [...prev, HELP_COMMAND])
      default:
        return handleError('Invalid command. Type help to see available options')
    }
  }

  return (
    <Layout>
      {lines.map((item, idx) => {
        return (
          <span className='flex' key={`root-line-${idx}`}>
            <LinePrefix text='ROOT' />{item}
          </span>
        )
      })}
      <p className='flex'>
        <LinePrefix text={nickname} />
        <Input callback={handleIinputValue}/>
      </p>
    </Layout>
  )
}

export default Home
