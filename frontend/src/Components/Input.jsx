import React from 'react'

function Input({ callback }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (callback) {
        callback(e.target.value)
        document.getElementById('input-terminal').value = ''
      }
    }
    return
  }

  return (
    <input id='input-terminal' className='input' onKeyDown={handleKeyPress} />
  )
}

export default Input
