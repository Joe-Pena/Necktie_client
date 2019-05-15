import { compose, withStateHandlers, withProps } from 'recompose'
import Todo from './Todo'
import Axios from 'axios'

export default compose(
  withStateHandlers({
    todoName: this.props.todo.name,
    todoDone: this.props.todo.done,
  },
  {
    toggleTodoDone: ({todo}) => (e) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/todos/${this.props.todo.id}`, {
        done: e.target.checked
      }, {withCredentials: true})
      .then(res => ({
        todoDone: res.data.data.done
      }))
    },
    changeTodoName: ({todoName}) => (e, newName) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/todos/${this.props.todo.id}`, {
        name: newName
      }, {withCredentials: true})
      .then(res => ({
        todoName: res.data.data.name
      }))
    }
  }),
  withProps(() => () => ({
    deleteTodo: Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/todos/${this.props.todo.id}`, {withCredentials: true})
  }))
)(Todo)