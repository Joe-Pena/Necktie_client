import { compose, withStateHandlers, withProps } from 'recompose'
import Project from './Project'
import Axios from 'axios'

let project = ({project}) => () => project

export default compose(
  withStateHandlers({
    projectDone: project.done,
    projectName: project.name
  },
  {
    toggleProjectDone: ({ projectDone }) => (e) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {
        done: e.target.value
      }, {withCredentials: true})
      .then(() => ({
        projectDone: e.target.value
      }))
    },
    editProject: ({ projectName }) => (e, newName) => {
      e.preventDefault()

      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {
        name: newName
      }, {withCredentials: true})
      .then(res => ({
        projectName: res.data.data.name
      }))
    }
  }),
  withProps(({fetchAllProjects}) => () => ({
    deleteProject: () => {
      Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {withCredentials: true})
      .then(() => fetchAllProjects())
    }
  }))
)(Project)