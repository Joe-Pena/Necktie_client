import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projectField: '',
      projects: [
        {
          name: 'Awesome Project',
          done: false,
          todos: [
            {
              name: 'Start the project',
              done: true
            },
            {
              name: 'Make it pretty',
              done: false
            }
          ]
        },
        {
          name: 'Second Project',
          done: true,
          todos: [
            {
              name: 'Start the project',
              done: true
            },
            {
              name: 'Make it pretty',
              done: true
            },
            {
              name: 'Add more candies',
              done: true
            }
          ]
        }
      ],
    }
  }

  projectFormSubmit(e) {
    e.preventDefault()
    this.setState({projects: [...this.state.projects, {
      name: this.state.projectField,
      done: false,
      todos: []
    }]})
  }

  toggleProjectDone(e, index) {
    console.log('toggling to:', e.target.checked)
    let projects = [... this.state.projects]
    let project = projects[index]
    project.done = e.target.checked
    this.setState({
      projects: [...projects]
    })
    console.log('after setstate', this.state.projects)
  }

  render() {
    return (
      <div className="App">
        <header className="Navbar">
          <span>Logo</span>
          <span>Login</span>
          <span>Signup</span>
        </header>
        <section className="home-page">
          <form 
            className="home-page_project-submit-form"
            onSubmit={this.projectFormSubmit}
          >
            <input 
              type="text" 
              placeholder="Add a Project"
              onChange= {e => this.setState({projectField: e.target.value})}
              value= {this.state.projectField}
            />
            <button type="submit">Add Project</button>
          </form>
          <div className="projects-list">
            {this.state.projects.map((project, index) => {
              return (
                <div className="projects-list-entry" key={index}>
                  <h2>{project.name}</h2>
                  <input type="checkbox" onChange={(e) => this.toggleProjectDone(e, index)}/>
                  <ul>
                    {project.todos.map((todo, index) => {
                      return (
                        <li key={index}>
                          <input type="checkbox" onChange={this.toggleProjectDone}/>
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
