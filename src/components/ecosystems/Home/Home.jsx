import React from 'react'
import Axios from 'axios'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projectField: '',
      todoField: '',
      editField: '',
      editActive: {
        project: null,
        todo: null
      },
      projects: []
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/api/v1/projects/', {withCredentials: true})
    .then(res => console.log(res.data.data))
    .catch(err => alert(err.message))
  }

  projectFormSubmit(e) {
    e.preventDefault()

    if(!this.state.projectField) {
      return alert('Field cannot be left blank')
    }

    this.setState({
      projects: [...this.state.projects, {
        name: this.state.projectField,
        done: false,
        todos: []
      }],
      projectField: ''
    })
  }

  todoFormSubmit(e, projectIndex) {
    e.preventDefault()
    
    if(!this.state.todoField) {
      return alert('Field cannot be left blank')
    }

    let projects = [...this.state.projects]
    let project = projects[projectIndex]
    project.todos = [...project.todos, {
      name: this.state.todoField,
      done: false
    }]
    this.setState({
      projects,
      todoField: ''
    })
  }

  toggleProjectDone(e, projectIndex) {
    let projects = [...this.state.projects]
    let project = projects[projectIndex]
    project.done = e.target.checked
    this.setState({
      projects: [...projects]
    })
  }

  toggleTodoDone(e, projectIndex, todoIndex) {
    let projects = [...this.state.projects]
    let project = projects[projectIndex]
    let todo = project.todos[todoIndex]
    todo.done = e.target.checked
    this.setState({
      projects: [...projects],
    })
  }

  removeProject(projectIndex) {
    console.log('removing project at:', projectIndex)
    let projects = [...this.state.projects]
    projects.splice(projectIndex, 1)
    this.setState({
      projects
    })
  }

  removeTodo(projectIndex, todoIndex) {
    console.log('removing todo #', todoIndex)
    let projects = [...this.state.projects]
    let project = projects[projectIndex]
    project.todos.splice(todoIndex, 1)
    this.setState({
      projects
    })
  }

  editProject(projectIndex) {
    console.log('editing project', projectIndex)
  }

  editTodo(projectIndex, todoIndex) {
    console.log('editing project', projectIndex, 'todo', todoIndex)
  }

  activateEdit(e, projectIndex, todoIndex) {
    e.preventDefault()

    if(todoIndex === null) {
      console.log('changing active project', projectIndex)
      this.setState({
        editActive: {
          project: projectIndex,
          todo: null
        }
      })
    } else {
      console.log('changing active todo', todoIndex, 'Project', projectIndex)
      this.setState({
        editActive: {
          project: projectIndex,
          todo: todoIndex
        }
      })
    }
  }

  editSelection(e, projectIndex, todoIndex) {
    e.preventDefault();
    let projects = [...this.state.projects]
    let project = projects[projectIndex]


    if(todoIndex === null) {
      console.log('changin name of p', projectIndex, 'to', this.state.editField)
      project.name = this.state.editField 
      this.setState({
        projects,
        editField: '',
        editActive: {
          project: null,
          todo: null
        }
      })
    } else {
      console.log('changin name of todo', projectIndex, '-', todoIndex, 'to', this.state.editField)
      project.todos[todoIndex].name = this.state.editField
      this.setState({
        projects,
        editField: '',
        editActive: {
          project: null,
          todo: null
        }
      })
    }
  }

  render() {
    return (
      <main className="home-page">
      
        <h1>Current Necktie projects</h1>
        <h3>Logged in: {`${this.props.loggedInStatus}`}</h3>

        {/* PROJECT SUBMIT FORM */}
        <form 
          className="home-page_project-submit-form"
          onSubmit={(e) => this.projectFormSubmit(e)}
        >
          <input
            type="text" 
            placeholder="Add a Project"
            onChange= {e => this.setState({projectField: e.target.value})}
            value= {this.state.projectField}
          />
          <button type="submit">Add Project</button>
        </form>

        {/* PROJECTLIST */}
        <div className="projects-list">
          {
            this.state.projects.map((project, projectIndex) => {
            return (
              <div className="projects-list_entry" key={projectIndex}>
                <h2>{project.name}</h2>
                <input type="checkbox" onChange={(e) => this.toggleProjectDone(e, projectIndex)}/>

                {/* TODO SUBMIT FORM */}
                <form 
                  className="projects-list_entry_todo-form"
                  onSubmit={(e) => this.todoFormSubmit(e, projectIndex)}
                >
                  <input 
                    type="text" 
                    onChange={(e) => this.setState({todoField: e.target.value})} 
                    placeholder="Add a new todo"
                    // value={this.state.todoField}
                  />
                  <button type="submit">Add Todo</button>
                </form>

                {/* EDIT PROJECT */}
                <form 
                  className=""
                  onSubmit={(e) => this.editSelection(e, projectIndex, null)}
                >
                  {this.state.editActive.project === projectIndex && this.state.editActive.todo === null ?
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
                  className="projects-list-entry_edit-btn"
                  onClick={(e) => this.activateEdit(e, projectIndex, null)}
                  >
                  Edit Project
                  </button>}
                </form>

                {/* DELETE BUTTON */}
                <button 
                  className="projects-list-entry_delete-btn"
                  onClick={() => this.removeProject(projectIndex)}
                >
                  Remove Project
                </button>

                {/* TODO LIST */}
                <ul>
                  {project.todos.map((todo, todoIndex) => {
                    return (
                      <li key={todoIndex}>
                        <input type="checkbox" onChange={(e) => this.toggleTodoDone(e, projectIndex, todoIndex)}/>
                        {todo.name}

                        {/* EDIT TODO */}
                        <form
                          className=""
                          onSubmit={(e) => this.editSelection(e, projectIndex, todoIndex)}
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
                          onClick={() => this.removeTodo(projectIndex, todoIndex)}
                        >
                          Remove todo
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          }
          )}
        </div>
      </main>
    )
  }
}

export default Home