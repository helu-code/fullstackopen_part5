/* eslint-disable linebreak-style */
import React from 'react'

const Notification = ({ message, type, showEnd }) => {

  setTimeout(() => {
    showEnd()
  }, 5000)


  if (message === null) {
    return null
  }

  if (type === 0)
  {
    return (
      <div className="info">
        {message}
      </div>
    )
  }
  else
  {

    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification