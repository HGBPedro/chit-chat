import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    let cursorTimeout;

    const buttons = document.getElementsByClassName('home__button');
    if (buttons.length > 0) {
      buttons[0].focus();
    }

    document.addEventListener('mousemove', function () {
      document.body.style.cursor = 'auto';

      cursorTimeout = setTimeout(() => document.body.style.cursor = 'none', 4000);
    })

    document.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'h':
        case 'ArrowLeft':
          return document.getElementById('join').focus();
        case 'l':
        case 'ArrowRight':
          return document.getElementById('create').focus();
      }
    })

    return () => {
      clearTimeout(cursorTimeout);
    }
  }, [])

  const handleRedirect = (mode) => {
    return navigate('/chat/join', { state: { mode } })
  }

  return (
    <main className='home'>
      <h1 className='home__title'>Chit-Chat</h1>
      <h4 className='home__subtitle'>Talk about anything. Anonymously.</h4>
      <div className='home__button-container'>
        <button className='home__button' id='join' onClick={() => handleRedirect('find')}>
          Join chat
        </button>
        <button className='home__button' id='create' onClick={() => handleRedirect('join')}>
          Create chat
        </button>
      </div>
    </main>
  )
}

export default Home
