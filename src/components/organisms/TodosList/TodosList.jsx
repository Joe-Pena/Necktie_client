import React from 'react' 
import { Todo } from '..';

const TodosList = ({ todos }) => {
  return(
    <ul className="projects-list_entry_todo_todo-list">
      {todos.map(todo => {
        return (
          <Todo todo={todo} key={todo.id}/>
        )
      })}
    </ul>
  )
}

export default TodosList