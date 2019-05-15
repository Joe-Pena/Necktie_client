import React from 'react'
import { TodoSubmitForm } from '../../molecules';

const TodoSection = ({ fetchAllProjects, parentProjectId, todos, createTodo}) => {
  return (
    <div className="projects-list-entry_todo">
      <TodoSubmitForm handlerFunction={createTodo} />

    {/* TODO LIST */}
      <ul className="projects-list_entry_todo_todo-list">
        {project.todos.map((todo, todoIndex) => {
          return (
            <li className="projects-list_entry_todo_todo-list_todo" key={todo.id}>
              <span>{todo.name}</span>
              {todo.done ? 
                <input 
                  type="checkbox" 
                  className="projects-list_entry_checkbox" 
                  onChange={(e) => this.toggleTodoDone(e, todo)} 
                  checked
                />
              :
                <input 
                  type="checkbox" 
                  className="projects-list_entry_checkbox" 
                  onChange={(e) => this.toggleTodoDone(e, todo)}
                />
              }

              {/* EDIT TODO */}
              <form
                className="projects-list_entry_todo_todo-list_todo_edit-form"
                onSubmit={(e) => this.editSelection(e, project, todo)}
              >
                {this.state.editActive.todo === todoIndex && this.state.editActive.project === projectIndex ? 
                <React.Fragment> 
                  <input 
                    className="edit-form" 
                    type="text" 
                    placeholder="New Name"
                    onChange={(e) => this.setState({editField: e.target.value})} 
                    value={this.state.editField}
                  />
                  <button type="submit">Change Name</button>
                </React.Fragment>
                :
                <button
                  onClick={(e) => this.activateEdit(e, projectIndex, todoIndex)}
                >
                  Edit Todo
                </button>
                } 
              </form>
              {/* REMOVE TODO */}
              <button
                className="projects-list_entry_todo_todo-list_todo_delete-btn"
                onClick={() => this.removeTodo(todo)}
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TodoSection