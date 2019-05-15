import { compose, withStateHandlers, withProps } from 'recompose'
import Project from './Project'
import Axios from 'axios'

export default compose(
  withStateHandlers(({ project }) => ({
    project: project,
    projectDone: project.done,
    projectName: project.name
  }),
  {
    toggleProjectDone: ({ project, projectDone }) => (e) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {
        done: e.target.checked
      }, {withCredentials: true})
      // .then((res) => {
        return({projectDone: e.target.checked})
      // })
    },
    editProject: ({ project }) => (e, newName) => {
      e.preventDefault()
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {
        name: newName
      }, {withCredentials: true})
      // .then(res => ({
        return ({projectName: newName})
      // }))
    },
    // deleteProject: ({ fetchAllProjects, project }) => () => {
    //   Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {withCredentials: true})
    //   .then(() => fetchAllProjects())
    // }
  }),
  withProps(() => ({fetchAllProjects, project}) => ({
    deleteProject: ({fetchAllProjects, project}) => (e) => {
      e.preventDefault()
      Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/projects/${project.id}`, {withCredentials: true})
      .then(() => fetchAllProjects())
    },
    project: project
  }))
)(Project)