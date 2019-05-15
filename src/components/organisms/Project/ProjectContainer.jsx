import { compose, withStateHandlers, withProps } from 'recompose'
import Project from './Project'
import Axios from 'axios'

export default compose(
  withStateHandlers({
    projectDone: this.props.project.done,
    projectName: this.props.project.name
  },
  {
    toggleProjectDone: ({ projectDone }) => (e) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${this.props.project.id}`, {
        done: e.target.value
      }, {withCredentials: true})
      .then(() => ({
        projectDone: e.target.value
      }))
    },
    editProject: ({ projectName }) => (e, newName) => {
      e.preventDefault()

      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${this.props.project.id}`, {
        name: newName
      }, {withCredentials: true})
      .then(res => ({
        projectName: res.data.data.name
      }))
    }
  }),
  withProps(() => () => ({
    deleteProject: () => {
      Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/projects/${this.props.project.id}`, {withCredentials: true})
      .then(() => this.props.fetchAllProjects())
    }
  }))
)(Project)