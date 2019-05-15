import { compose, withStateHandlers, withProps } from 'recompose'
import Todo from './Todo'
import Axios from 'axios'

let todo = ({todo}) => () => todo

export default compose(
  withStateHandlers({
    todoName: todo.name,
    todoDone: todo.done,
  },
  {
    toggleTodoDone: ({todo}) => (e) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/todos/${todo.id}`, {
        done: e.target.checked
      }, {withCredentials: true})
      .then(res => ({
        todoDone: res.data.data.done
      }))
    },
    changeTodoName: ({todoName}) => (e, newName) => {
      Axios.put(`${process.env.REACT_APP_API_URL}/api/v1/todos/${todo.id}`, {
        name: newName
      }, {withCredentials: true})
      .then(res => ({
        todoName: res.data.data.name
      }))
    }
  }),
  withProps(() => () => ({
    deleteTodo: Axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/todos/${todo.id}`, {withCredentials: true})
  }))
)(Todo)