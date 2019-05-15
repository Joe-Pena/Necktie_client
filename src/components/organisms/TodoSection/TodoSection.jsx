import React from 'react'
import { TodoSubmitForm } from '../../molecules';
import { TodosList } from '..';

const TodoSection = ({ fetchAllProjects, parentProjectId, todos, createTodo}) => {
  return (
    <div className="projects-list-entry_todo">
      <TodoSubmitForm handlerFunction={createTodo} />

    {/* TODO LIST */}
      <TodosList todos={todos}/>
 
    </div>
  )
}

export default TodoSection