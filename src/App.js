import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projectField: '',
      todoField: '',
      projects: [
        {
          name: 'Awesome Project',
          done: false,
          todos: [
            {
              name: 'Start the project',
              done: false
            },
            {
              name: 'Make it pretty',
              done: false
            }
          ]
        },
        {
          name: 'Second Project',
          done: false,
          todos: [
            {
              name: 'Start the project',
              done: false
            },
            {
              name: 'Make it pretty',
              done: false
            },
            {
              name: 'Add more candies',
              done: false
            }
          ]
        }
      ],
    }
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

  render() {
    return (
      <div className="App">

        {/* HEADER */}
        <header className="Navbar">
          <span>Logo</span>
          <span>Login</span>
          <span>Signup</span>
        </header>

        {/* HOMEPAGE */}
        <section className="home-page">

          <h1>Current Necktie projects</h1>

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
            {this.state.projects.map((project, projectIndex) => {
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
                  <button 
                    className="projects-list-entry_edit-btn"
                    onClick={() => this.editProject(projectIndex)}
                  >
                    Edit Project
                  </button>

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
                          <button
                            onClick={() => this.editTodo(projectIndex, todoIndex)}
                          >
                            Edit Todo
                          </button>

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
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
