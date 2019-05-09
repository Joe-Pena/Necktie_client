import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

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
    this.fetchAllProjects()
  }

  fetchAllProjects() {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/projects/`, {withCredentials: true})
    .then(res => {
      this.setState({
        projects: res.data.data,
        projectField: '',
        todoField: '',
        editField: '',
        editActive: {
          project: null,
          todo: null
        }
      })
    })
    .catch(err => alert(err.message))
  }


  projectFormSubmit(e) {
    e.preventDefault()

    if(!this.state.projectField) {
      return alert('Field cannot be left blank')
    }
    Axios.post(`${process.env.REACT_APP_API_URL}/api/v1/projects`, {
      name: this.state.projectField,
      done: false,
      todos: []
    }, {withCredentials: true})
    .then(() => this.fetchAllProjects())
   
  }

  todoFormSubmit(e, project) {
    e.preventDefault()
    
    if(!this.state.todoField) {
      return alert('Field cannot be left blank')
    }
    Axios.post(`${process.env.REACT_APP_API_URL}/api/v1/todos`, {
      name: this.state.todoField,
      done: false,
      project_id: project.id
    },{withCredentials: true})
    .then(() => this.fetchAllProjects())
  }

  toggleProjectDone(e, project) {
    let done = e.target.checked
    Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {
        done
      }, {withCredentials: true})
    .then(() => this.fetchAllProjects())
  }

  toggleTodoDone(e, todo) {
    let done = e.target.checked
    Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/todos/${todo.id}`, {
        done
      }, {withCredentials: true})
    .then(() => this.fetchAllProjects())
  }

  removeProject(project) {
    Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {withCredentials: true})
    .then(() => this.fetchAllProjects())
  }

  removeTodo(todo) {
    Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/todos/${todo.id}`, {withCredentials: true})
    .then(() => this.fetchAllProjects())
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

  editSelection(e, project, todo) {
    e.preventDefault();

    if(!todo) {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {
        name: this.state.editField
      }, {withCredentials: true})
      .then(() => this.fetchAllProjects())
    } else {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/todos/${todo.id}`, {
        name: this.state.editField
      }, {withCredentials: true})
      .then(() => this.fetchAllProjects())
    }
  }

  render() {
    if(!this.props.loggedInStatus) {
      return (
        <main className="home-page">
          <div className="home-page_welcome">
            <h1>Current Necktie Projects</h1>
            <h3>Welcome, <Link to='/login'>login</Link> to view and edit projects</h3>
          </div>
          <div className="projects-list">
            {this.state.projects.map(project => {
              return (
                <div className="projects-list_entry--restricted" key={project.id}>
                  <h2>{project.name}</h2>
                  <Link to='/login'>Log in to see more</Link>
                </div>
              )
            })}
          </div>
        </main>
      )
    }

    return (
      <main className="home-page">

        <div className="home-page_welcome">
          <h1>Current Necktie Projects</h1>
          <h3>Welcome, {this.props.username}</h3>

          {/* PROJECT SUBMIT FORM */}
          <form 
            className="home-page_welcome_project-submit-form"
            onSubmit={(e) => this.projectFormSubmit(e)}
          >
            <input
              type="text" 
              placeholder="Project name"
              onChange= {e => this.setState({projectField: e.target.value})}
              value= {this.state.projectField}
            />
            <button type="submit">Add Project</button>
          </form>
        </div>
        {/* PROJECTLIST */}
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
                <ul className="projects-list-entry_todo_todo-list">
                  {project.todos.map((todo, todoIndex) => {
                    return (
                      <li key={todo.id}>
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
                          className=""
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
                          onClick={() => this.removeTodo(todo)}
                        >
                          Remove todo
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
      </main>
    )
  }
}

export default Home