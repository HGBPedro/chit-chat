import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import cookieHandler from '../Hooks/cookieHandler';
import { HOME_TEXTS } from '../constants';
import LinePrefix from '../Components/LinePrefix';
import Input from '../Components/Input';

function Home() {
  const navigate = useNavigate()
  const { fetchCookie } = cookieHandler()
  const { title, subtitle, description } = HOME_TEXTS
  const [lines, setLines] = useState([title, subtitle, description])
  const [nickname, setNickname] = useState('UNSET_USERNAME')

  useEffect(() => {
    const nicknameCookie = fetchCookie('nickname') 

    if (nicknameCookie) setNickname(nicknameCookie)
  }, [])

  const handleRedirect = (mode) => {
    return navigate('/chat/join', { state: { mode } })
  }

  const handleIinputValue = (value) => {
    const commands = value.split(' ')


  }

  return (
    <Layout>
      {lines.map((item, idx) => {
        return (
          <p className='flex' key={`root-line-${idx}`}>
            <LinePrefix text='ROOT' />{item}
          </p>
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
