import { compose, withStateHandlers, mapProps, withProps } from 'recompose'
import Axios from 'axios'
import TodoSection from './TodoSection';

//How to access props that are being given from the parent?
// let todos = ({todos}) => () => todos
// let parentProjectId = ({parentProjectId}) => () => parentProjectId
// let fetchAllProjects = ({fetchAllProjects}) => () => fetchAllProjects

export default compose(
  withProps(() => () => ({
    createTodo: () => (e, newTodo) => {
      e.preventDefault()

      Axios.post(`${process.env.REACT_APP_API_URL}/api/v1/todos`, {
        name: newTodo,
        done: false,
        project_id: this.props.parentProjectId
      },{withCredentials: true})
      .then(() => this.props.fetchAllProjects())
    }
  }))
)(TodoSection)