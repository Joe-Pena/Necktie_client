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
    let projects = [...this.state.projects]
    let project = projects[projectIndex]
    project.todos = [...project.todos, {
      name: this.state.todoField,
      done: false
    }]
    this.setState({
      projects
    })
    console.log('todo submitted', this.state.todoField)
    console.log('newSrare', this.state.projects)
    
  }

  toggleProjectDone(e, projectIndex) {
    console.log('toggling to:', e.target.checked)
    let projects = [...this.state.projects]
    let project = projects[projectIndex]
    project.done = e.target.checked
    this.setState({
      projects: [...projects]
    })
    console.log('after setstate', this.state.projects)
  }

  toggleTodoDone(e, projectIndex, todoIndex) {
    console.log('index', todoIndex)
    console.log('project', projectIndex)
    console.log('toggling todo to:', e.target.checked)
    let projects = [...this.state.projects]
    let project = projects[projectIndex]
    let todo = project.todos[todoIndex]
    todo.done = e.target.checked
    this.setState({
      projects: [...projects]
    })
    console.log('after todo update', this.state.projects)
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
                      // value={this.state.todoField}
                    />
                    <button type="submit">Add Todo</button>
                  </form>

                  {/* TODO LIST */}
                  <ul>
                    {project.todos.map((todo, todoIndex) => {
                      return (
                        <li key={todoIndex}>
                          <input type="checkbox" onChange={(e) => this.toggleTodoDone(e, projectIndex, todoIndex)}/>
                          {todo.name}
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
