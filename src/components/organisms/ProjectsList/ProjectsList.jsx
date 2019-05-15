import React from 'react'

const ProjectsList = ({projects, }) => {
  return (
    <div className="projects-list">
          {
            this.state.projects.map((project, projectIndex) => {
            return (
              <div className="projects-list_entry" key={project.id}>
                <div className="projects-list_entry_project">
                  <h2 className="projects-list_entry_project_title">{project.name}</h2>

                  {project.done ?
                    <React.Fragment> 
                      <span>Done: </span>
                      <input 
                        type="checkbox" 
                        className="projects-list_entry_project_checkbox" 
                        onChange={(e) => this.toggleProjectDone(e, project)} 
                        checked
                      />
                    </React.Fragment>
                  :
                    <React.Fragment>
                      <span>Done: </span>
                      <input 
                        type="checkbox" 
                        className="projects-list_entry_project_checkbox" 
                        onChange={(e) => this.toggleProjectDone(e, project)}
                      />
                    </React.Fragment>
                  }

                  {/* EDIT PROJECT */}
                  <form 
                    className="projects-list_entry_project_edit-form"
                    onSubmit={(e) => this.editSelection(e, project, null)}
                  >
                    {this.state.editActive.project === projectIndex && this.state.editActive.todo === null ?
                      <React.Fragment> 
                        <input 
                          type="text" 
                          placeholder="New Name"
                          onChange={(e) => this.setState({editField: e.target.value})} 
                          value={this.state.editField}
                        />
                        <button type="submit">Edit Name</button>
                      </React.Fragment>
                    : 
                    <button
                    onClick={(e) => this.activateEdit(e, projectIndex, null)}
                    >
                    Edit Name
                    </button>}
                  </form>
                  
                  {/* DELETE BUTTON */}
                  <button 
                    className="projects-list_entry_project_delete-btn"
                    onClick={() => this.removeProject(project)}
                  >
                    Delete
                  </button>
                </div>
                {/* TODO SUBMIT FORM */}
                <div className="projects-list-entry_todo">
                  <form 
                    className="projects-list_entry_todo_todo-form"
                    onSubmit={(e) => this.todoFormSubmit(e, project)}
                  >
                    <input 
                      type="text" 
                      onChange={(e) => this.setState({todoField: e.target.value})} 
                      placeholder="Add a new todo"
                      // value={this.state.todoField}
                    />
                    <button type="submit">Add Todo</button>
                  </form>

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
              </div>
            )
          }
          )}
    </div>
  )
}