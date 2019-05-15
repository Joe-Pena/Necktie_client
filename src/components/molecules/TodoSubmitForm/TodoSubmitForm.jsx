import React from 'react'

const TodoSubmitForm = ({ handlerFunction, inputValue, changeInputValue }) => {
  return (
    <form 
      className="projects-list_entry_todo_todo-form"
      onSubmit={(e) => handlerFunction(e, inputValue)}
    >
      <input 
        type="text" 
        onChange={(e) => changeInputValue(e)} 
        placeholder="Add a new todo"
        value={inputValue}
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default TodoSubmitForm