import React from 'react'

function ErrorMessage({ err }) {
  const { error } = err
  console.log(err.error)
  if (!error) return null
  return (
    <p className='error-message'>
      <span className='error-message__type'>
        {` [${error.name}] `}
      </span>
      {error.message}
    </p>
  )
}

export default ErrorMessage
