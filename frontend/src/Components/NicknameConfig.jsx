import React from 'react'
import cookieHandler from '../Hooks/cookieHandler'

function NicknameConfig(callback) {
  const inputRef = React.useRef('')
  const { addCookie } = cookieHandler()

  const handleInputChange = (e) => {
    inputRef.current = e.target.value
  }

  const handleNickname = () => {
    addCookie('nickname', inputRef.current)
    if (callback) callback()
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

export default NicknameConfig
