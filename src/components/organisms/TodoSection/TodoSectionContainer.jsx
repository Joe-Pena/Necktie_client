import { compose, withStateHandlers } from 'recompose'
import Axios from 'axios'
import TodoSection from './TodoSection';

export default compose(
  withStateHandlers({
    todos: this.props.todos,
  },
  {
    createTodo: ({todos}) => (e, newTodo) => {
      e.preventDefault()

      Axios.post(`${process.env.REACT_APP_API_URL}/api/v1/todos`, {
        name: newTodo,
        done: false,
        project_id: this.props.parentProjectId
      },{withCredentials: true})
      .then(() => this.props.fetchAllProjects())
    }
  })
)(TodoSection)