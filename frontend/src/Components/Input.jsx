import React from 'react'

function Input({ callback }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (callback) callback(e.target.value)
    }
    return
  }

  return (
    <input className='input' onKeyDown={handleKeyPress} />
  )
}

export default Input
