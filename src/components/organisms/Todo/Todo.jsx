import React from 'react'
import { DoneCheckbox, DeleteButton } from '../../atoms';
import { EditNameForm } from '../../molecules';

const Todo = ({ todo, todoDone, toggleTodoDone, changeTodoName, deleteTodo }) => {
  return (
    <li className="projects-list_entry_todo_todo-list_todo" key={todo.id}>
      <span>{todo.name}</span>
      <DoneCheckbox done={todoDone} handlerFunction={toggleTodoDone} />

      {/* EDIT TODO */}
      <EditNameForm className="projects-list_entry_todo_todo-list_todo_edit-form" handlerFunction={changeTodoName} />
      {/* REMOVE TODO */}
      <DeleteButton className="projects-list_entry_todo_todo-list_todo_delete-btn" handlerFunction={deleteTodo} />
    </li>
  )
}

export default Todo