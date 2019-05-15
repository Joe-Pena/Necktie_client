import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { RestrictedProjects, ProjectsList } from '../../organisms';
import { ProjectSubmitForm } from '../../molecules';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todoField: '',
      editField: '',
      editActive: {
        project: null,
        todo: null
      },
      projects: []
    }

    this.projectFormSubmit = this.projectFormSubmit.bind(this)
  }

  // componentDidMount() {
  //   this.fetchAllProjects()
  // }

  fetchAllProjects() {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/projects/`, {withCredentials: true})
    .then(res => {
      console.log(res)
      this.setState({
        projects: res.data.data,
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


  projectFormSubmit(e, name) {
    e.preventDefault()
    if(!name) {
      return alert('Field cannot be left blank')
    }
    Axios.post(`${process.env.REACT_APP_API_URL}/api/v1/projects`, {
      name: name,
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
          <RestrictedProjects projects={this.state.projects}/>
        </main>
      )
    }

    return (
      <main className="home-page">
        <div className="home-page_welcome">
          <h1>Current Necktie Projects</h1>
          <h3>Welcome, {this.props.username}</h3>
          <ProjectSubmitForm projectFormSubmit={this.projectFormSubmit} />
        </div>
        {/* PROJECTLIST */}
        <ProjectsList />
      </main>
    )
  }
}

export default Home