import React from 'react'

const DeleteButton = ({className, handlerFunction}) => {
  return (
  <button 
    className={className}
    onClick={(e) => handlerFunction(e)}
  >
  Delete
  </button>
  )
}

export default DeleteButton