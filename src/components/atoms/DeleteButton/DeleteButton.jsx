import React from 'react'

const DeleteButton = ({className, handlerFunction}) => {
  return (
  <button 
    className={className}
    onClick={() => handlerFunction()}
  >
  Delete
  </button>
  )
}

export default DeleteButton