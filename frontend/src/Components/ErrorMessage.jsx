import React from 'react'

function ErrorMessage(err) {
  const { error } = err
  return (
    <p className='error-message'>
      &gt;
      <span className='error-message__type'>
        {` [${error.name}] `}
      </span>
      {error.message}
    </p>
  )
}

export default ErrorMessage
